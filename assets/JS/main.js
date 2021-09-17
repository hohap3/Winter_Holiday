
// Run các function
function run() {

  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);
  // Khi người dùng nhấn vào element , hiển thị ra menu
  
  function menuTools() {

    const headerLinkMenu = $('.header__tools-link--has-menu');
    const headerMenuSlide = $('.header__tools-menu-slide');
    const headerMenuOverlay = $('.header__tools-overlay');
    const headerToolMenu = $('.header__tools-menu');
    const closeBtn = $('.header__tools-close-btn');

    headerLinkMenu.onclick = () => {
      headerMenuSlide.classList.add('open');
      // console.log(headerMenuSlide);
      headerToolMenu.style.transform = 'translateX(0)';
    }

    headerMenuOverlay.onclick = () => {
      headerMenuSlide.classList.remove('open');
      headerToolMenu.style.transform = 'translateX(100%)';
    }

    // Ngăn chặn hành vi nổi bọt
    headerToolMenu.onclick = function(e) {
      e.stopPropagation();
    }

    closeBtn.onclick = function() {
      headerMenuSlide.classList.remove('open');
      headerToolMenu.style.transform = 'translateX(100%)';
    }
   
  }

  // Hiển thị hình ảnh sliders

  function sliders() {

    let slideIndex = 0;

    const sliderImages = $$('.slider-image');

    const nextBtn = $('.slider-next-btn');
    const prevBtn = $('.slider-prev-btn');
    
    // prev / next button
    function prevImage() {
      slideIndex--;
      if(slideIndex < 0)
        slideIndex = sliderImages.length - 1;
      showImage(slideIndex);
    }

    function nextImage() {
      slideIndex++;
      if(slideIndex > sliderImages.length - 1)
        slideIndex = 0;
      showImage(slideIndex);
    }

    // Show Picture
    function showImage(n) {
      sliderImages.forEach((sliderImage,index) => {
        if(n === index)
          sliderImage.style.display = 'flex';
        else
          sliderImage.style.display = 'none';  
      })
    }

    // Show random slider every 6s
    setInterval(() => {
      nextImage();
    }, 4500);

    showImage(slideIndex);

    nextBtn.onclick = () => {
      nextImage();
    }
    prevBtn.onclick = () => {
      prevImage();
    }
  }

  function sliderAction() {
    let scrollAmount = 0;

    const dots = $$('.dot-top');
    const sliderActionDetails = $$('.slider-action-details');
    const sliderActionContainers = $$('.slider-action-container');


    dots.forEach((dot) => {
      dot.onclick = function() {
        $('.dot-top.active').classList.remove('active');
        dot.classList.add('active');
      }
    })


    function scrollToLeft(n) {
      sliderActionDetails.scrollTo({
        top:0,
        left:(scrollAmount -= n),
        behavior:'smooth'
      });

      if(scrollAmount < 0)
        scrollAmount = 0;
    }

    function scrollToRight(n) {
     
      if(scrollAmount  <= sliderActionDetails.scrollWidth - sliderActionDetails.clientWidth) {
        sliderActionDetails.scrollTo({
          top:0,
          left:(scrollAmount += n),
          behavior:"smooth"
        })
      }
    }


    $('.left-dot').onclick(() => {
      scrollToLeft(480);
    })

    $('.right-dot').onclick(() => {
      scrollToRight(480);
    });

  }

  function slideUpTeamInfo() {

    const teamMemberInfos = $$('.team-member-info');

    const teamMembers = $$('.team-member-container');
    

    teamMembers.forEach((teamMember) => {
      // Khi người dùng hover vào , thì sẽ hiễn thị info
      teamMember.addEventListener('mouseover',() => {
        teamMember.classList.add('active');
      })

      teamMember.addEventListener('mouseout',() => {
        $('.team-member-container.active').classList.remove('active');
      })

    })

  }

  menuTools();
  sliders();
  sliderAction();
  slideUpTeamInfo();  
}

run();