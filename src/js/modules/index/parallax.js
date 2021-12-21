window.onload = () => {
    const isMobile = {
        Android:        function() { return navigator.userAgent.match(/Android/i) ? true : false; },
        BlackBerry:     function() { return navigator.userAgent.match(/BlackBerry/i) ? true : false; },
        iOS:            function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false; },
        Windows:        function() { return navigator.userAgent.match(/IEMobile/i) ? true : false; },
        any:            function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());  }
    };
      
    if ( !isMobile.any() ) {
        const parallax = document.querySelector('.parallax');
        const secondBg = document.querySelector('.second-bg');
        const thirdBg = document.querySelector('.third-bg');
        const fourthBg = document.querySelector('.fourth-bg');
        const headingTop = document.querySelector('.heading-second-top');
        const headingBottom = document.querySelector('.heading-second-bottom');
        const centerRhomb = document.querySelector('.rhomb-intro-center');
        const leftTopRhomb = document.querySelector('.rhomb-intro-left-top');
        const leftBottomRhomb = document.querySelector('.rhomb-intro-left-bottom');
        const rightTopRhomb = document.querySelector('.rhomb-intro-right-top');
        const rightBottomRhomb = document.querySelector('.rhomb-intro-right-bottom');
        
        const speed = 0.1;
        const offset = 15;

        let positionX = 0, positionY = 0;
        let coordXprocent = 0, coordYprocent = 0;

        const parallaxStyle = () => {
            const distX = coordXprocent - positionX;
            const distY = coordYprocent - positionY;

            positionX = positionX + (distX * speed);
            positionY = positionY + (distY * speed);

            secondBg.style.cssText = `transform: translate(0, ${positionY / (offset * 2)}%);`;
            thirdBg.style.cssText = `transform: translate(0, ${positionY / -offset}%);`;
            fourthBg.style.cssText = `transform: translate(0, ${positionY / (offset / 2)}%);`;
            headingTop.style.cssText = `transform: translate(${positionX / -offset}%, 0);`;
            headingBottom.style.cssText = `transform: translate(${positionX / (offset / 2)}%, 0);`;
            centerRhomb.style.cssText = `transform: translate(${positionX / (offset / 3)}%, ${positionY / offset}%);`;
            leftTopRhomb.style.cssText = `transform: translate(${positionX / (offset / 3)}%, ${positionY / (offset / 3)}%);`;
            leftBottomRhomb.style.cssText = `transform: translate(${positionX / (offset / 3)}%, ${positionY / (offset / 3)}%);`;
            rightTopRhomb.style.cssText = `transform: translate(${positionX / (offset / 3)}%, ${positionY / (offset / 3)}%);`;
            rightBottomRhomb.style.cssText =`transform: translate(${positionX / (offset / 3)}%, ${positionY / (offset / 3)}%);`;

            requestAnimationFrame(parallaxStyle);
        }
        parallaxStyle();
        
        parallax.addEventListener('mousemove', (e) => {
            const parallaxWidth = parallax.offsetWidth;
            const parallaxHeight = parallax.offsetHeight;

            const coordX = e.pageX - parallaxWidth / 2;
            const coordY = e.pageY - parallaxHeight / 2;

            coordXprocent = coordX / parallaxWidth * 100;
            coordYprocent = coordY / parallaxHeight * 100;
        })
    }
}