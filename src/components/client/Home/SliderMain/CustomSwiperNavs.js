import { useSwiper } from "swiper/react";

const CustomSwiperNavs = () => {
  const swiper = useSwiper();
  return (
    <div className="swiper-nav-btns__wrapper">
      <div className="container">
        <div className="swiper-nav-btns">
          <button
            className="btn-reset swiper-nav-btns__btn"
            onClick={() => swiper.slidePrev()}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.3813 12.714L17.7312 20.064C17.9812 20.314 18.1021 20.6056 18.0938 20.939C18.0854 21.2723 17.9563 21.564 17.7063 21.814C17.4563 22.064 17.1646 22.189 16.8313 22.189C16.4979 22.189 16.2063 22.064 15.9563 21.814L8.25625 14.139C8.05625 13.939 7.90625 13.714 7.80625 13.464C7.70625 13.214 7.65625 12.964 7.65625 12.714C7.65625 12.464 7.70625 12.214 7.80625 11.964C7.90625 11.714 8.05625 11.489 8.25625 11.289L15.9563 3.58898C16.2063 3.33898 16.5021 3.21814 16.8438 3.22648C17.1854 3.23481 17.4812 3.36398 17.7312 3.61398C17.9812 3.86398 18.1062 4.15564 18.1062 4.48898C18.1062 4.82231 17.9812 5.11398 17.7312 5.36398L10.3813 12.714Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button
            className="btn-reset swiper-nav-btns__btn"
            onClick={() => swiper.slideNext()}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.8633 12.7139L7.51329 5.36387C7.26329 5.11387 7.14246 4.81803 7.15079 4.47637C7.15913 4.1347 7.28829 3.83887 7.53829 3.58887C7.78829 3.33887 8.08413 3.21387 8.42579 3.21387C8.76746 3.21387 9.06329 3.33887 9.31329 3.58887L16.9883 11.2889C17.1883 11.4889 17.3383 11.7139 17.4383 11.9639C17.5383 12.2139 17.5883 12.4639 17.5883 12.7139C17.5883 12.9639 17.5383 13.2139 17.4383 13.4639C17.3383 13.7139 17.1883 13.9389 16.9883 14.1389L9.28829 21.8389C9.03829 22.0889 8.74663 22.2097 8.41329 22.2014C8.07996 22.193 7.78829 22.0639 7.53829 21.8139C7.28829 21.5639 7.16329 21.268 7.16329 20.9264C7.16329 20.5847 7.28829 20.2889 7.53829 20.0389L14.8633 12.7139Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomSwiperNavs;
