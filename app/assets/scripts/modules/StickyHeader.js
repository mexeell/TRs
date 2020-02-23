import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class StickyHeader {
    constructor() {
        this.siteHeader = document.querySelector(".site-header")
        this.pageSection = document.querySelectorAll(".page-section")
        this.browserHeight = window.innerHeight
        this.previousScrollY - window.scrollY
        this.topScroll = document.querySelectorAll(".primary-nav")
        this.events()
    }
    events() {
        window.addEventListener("scroll", throttle(() => this.runOnScroll(), 50))
        window.addEventListener("resize", debounce(() => {
            this.browserHeight = window.innerHeight
        }, 100))
    }

    runOnScroll() {
        this.determineScrollDirection()
        if (window.scrollY > 60) {
            this.siteHeader.classList.add("site-header--dark")
            
        } 
        else {
            this.siteHeader.classList.remove("site-header--dark")
        }

        this.pageSection.forEach(el => this.calcSection(el))
    }

    determineScrollDirection(){
        if (window.scrollY > this.previousScrollY){
            this.scrollDirection = 'down'
        } else {
            this.scrollDirection = 'up'
        }
        this.previousScrollY = window.scrollY
    }

    calcSection(el){
        if (window.scrollY + this.browserHeight > el.offsetTop && window.scrollY <el.offsetTop + el.offsetHeight){
            let scrollPercent = el.getBoundingClientRect().y / this.browserHeight * 100
            if (scrollPercent < 18 && scrollPercent > -0.1 && this.scrollDirection == 'down' || scrollPercent < 35 && this.scrollDirection == 'up') {
                let matchingLink = el.getAttribute("data-matching-link")
                document.querySelector(matchingLink).classList.add("is-current-link")
                document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(el => el.classList.remove("is-current-link"))
                
            }
        
        }
    }
    

    
    }


export default StickyHeader;