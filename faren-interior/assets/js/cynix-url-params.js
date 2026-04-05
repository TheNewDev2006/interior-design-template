/**
 * Cynix Inc - Universal URL Parameter Customization Script
 * 
 * This script personalizes website templates with prospect information via URL parameters.
 * Fallback: Cynix Inc contact information
 * 
 * Usage: ?business=Joes+Pizza&owner=Joe+Smith&phone=1234567890&email=joe@example.com&location=New+York
 */

(function() {
    'use strict';
    
    // Parse URL parameters
    var params = new URLSearchParams(window.location.search);
    
    // Extract parameters with Cynix Inc fallback values
    var businessName = params.get('business') || params.get('name') || 'Cynix Inc';
    var ownerName = params.get('owner') || 'Manisha Gurukanda';
    var phone = params.get('phone') || '0725582444';
    var email = params.get('email') || 'hello@cynix.inc';
    var address = params.get('address') || params.get('location') || '237, Jampettah Street, Colombo 13';
    var city = params.get('city') || 'Colombo';
    var tagline = params.get('tagline') || '';
    
    // Detect business type from URL path or default to generic
    var businessType = detectBusinessType();
    
    /**
     * Detect business type from current URL path
     */
    function detectBusinessType() {
        var path = window.location.pathname.toLowerCase();
        
        if (path.includes('architecture')) return 'Architecture Firm';
        if (path.includes('construction')) return 'Construction Company';
        if (path.includes('dental')) return 'Dental Clinic';
        if (path.includes('education') || path.includes('preschool') || path.includes('kidschool')) return 'Educational Institution';
        if (path.includes('gym') || path.includes('fitness') || path.includes('yoga')) return 'Fitness Center';
        if (path.includes('restaurant') || path.includes('food')) return 'Restaurant';
        if (path.includes('hair') || path.includes('salon') || path.includes('barber')) return 'Salon';
        if (path.includes('hotel') || path.includes('resort')) return 'Hotel & Resort';
        if (path.includes('interior')) return 'Interior Design Studio';
        if (path.includes('logistics')) return 'Logistics Company';
        if (path.includes('luxury') || path.includes('properties')) return 'Luxury Properties';
        if (path.includes('real-estate') || path.includes('realestate')) return 'Real Estate Agency';
        if (path.includes('spa') || path.includes('wellness')) return 'Spa & Wellness Center';
        if (path.includes('taxi') || path.includes('rideshare')) return 'Transportation Service';
        if (path.includes('travel') || path.includes('tourism')) return 'Travel Agency';
        
        return 'Professional Services';
    }
    
    /**
     * Replace text content in elements
     */
    function replaceText(selectors, newText) {
        var elements = document.querySelectorAll(selectors);
        elements.forEach(function(el) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.value = newText;
                el.placeholder = newText;
            } else {
                el.textContent = newText;
            }
        });
    }
    
    /**
     * Update href attributes
     */
    function updateHref(selector, value) {
        var elements = document.querySelectorAll(selector);
        elements.forEach(function(el) {
            el.href = value;
        });
    }
    
    // Apply customizations
    
    // Business Name - using multiple selector patterns for maximum compatibility
    replaceText(
        '.business-name, .company-name, .site-name, .brand-name, ' +
        '#business-name, #company-name, #site-name, ' +
        '[data-business-name], [data-company-name], ' +
        '.gym-name, .restaurant-name, .hotel-name, .spa-name, .clinic-name, .salon-name, .agency-name, ' +
        '.logo-text, .site-title',
        businessName
    );
    
    // Owner Name
    replaceText(
        '.owner-name, .manager-name, .contact-person, ' +
        '#owner-name, #manager-name, ' +
        '[data-owner-name], [data-manager-name], ' +
        '.gym-owner, .restaurant-owner',
        ownerName
    );
    
    // Phone Number
    replaceText(
        '.phone, .phone-number, .contact-phone, .tel, ' +
        '#phone, #phone-number, ' +
        '[data-phone], [data-tel], ' +
        '.gym-phone, .restaurant-phone, .hotel-phone, .spa-phone, .clinic-phone',
        phone
    );
    
    // Update all tel: links
    updateHref('a[href^="tel:"]', 'tel:' + phone.replace(/\s/g, ''));
    
    // Email
    replaceText(
        '.email, .contact-email, .business-email, ' +
        '#email, #contact-email, ' +
        '[data-email]',
        email
    );
    
    // Update all mailto: links
    updateHref('a[href^="mailto:"]', 'mailto:' + email);
    
    // Address
    replaceText(
        '.address, .location, .contact-address, .business-address, ' +
        '#address, #location, ' +
        '[data-address], [data-location], ' +
        '.gym-address, .restaurant-address, .hotel-address, .spa-address, .clinic-address',
        address
    );
    
    // City
    replaceText(
        '.city, .business-city, ' +
        '#city, ' +
        '[data-city]',
        city
    );
    
    // Tagline (if provided)
    if (tagline) {
        replaceText(
            '.tagline, .slogan, .subtitle, ' +
            '#tagline, #slogan, ' +
            '[data-tagline]',
            tagline
        );
    }
    
    // Update page title
    document.title = businessName + ' - ' + businessType;
    
    // Update meta description
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        var description = businessName + ' - Your trusted ' + businessType.toLowerCase() + ' in ' + city + '. ';
        description += 'Contact us at ' + phone + ' or visit us at ' + address + '.';
        metaDesc.setAttribute('content', description);
    }
    
    // Update Open Graph tags for social sharing
    var ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.setAttribute('content', businessName + ' - ' + businessType);
    }
    
    var ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.setAttribute('content', businessName + ' - ' + businessType + ' in ' + city);
    }
    
    // Update Twitter Card tags
    var twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
        twitterTitle.setAttribute('content', businessName + ' - ' + businessType);
    }
    
    // Log customization (for debugging - remove in production)
    if (console && console.log) {
        console.log('Cynix Inc URL Customization Applied:', {
            business: businessName,
            owner: ownerName,
            phone: phone,
            email: email,
            address: address,
            city: city,
            type: businessType
        });
    }
    
})();
