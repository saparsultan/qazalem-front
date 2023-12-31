import Link from "next/link";

const Social = ({ data }) => {
  return (
    <ul className="social list-reset">
      {data?.data?.results?.length &&
        data?.data?.results.map(({ id, name, url }) => {
          return (
            <li key={id} className="social__item">
              <Link
                href={url}
                target="_blank"
                className="social__link"
                title={name}
              >
                <i className="social__icon">
                  {(() => {
                    switch (name) {
                      case "youtube":
                        return (
                          <svg
                            width="44"
                            height="44"
                            viewBox="0 0 44 44"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="44"
                              height="44"
                              rx="22"
                              fill="#FF0000"
                            />
                            <path
                              d="M34.1815 15.8637C33.8839 14.7624 33.0254 13.9 31.9249 13.6055C30.4466 13.0344 16.1287 12.7546 11.9752 13.6218C10.8747 13.9197 10.0129 14.7787 9.71859 15.88C9.05142 18.8091 9.00073 25.1418 9.73495 28.1364C10.0326 29.2377 10.891 30.1 11.9915 30.3946C14.9186 31.0687 28.8343 31.1637 31.9412 30.3946C33.0417 30.0967 33.9035 29.2377 34.1978 28.1364C34.9092 24.9455 34.9599 19.0055 34.1815 15.8637Z"
                              fill="white"
                            />
                            <path
                              d="M26.1697 22L19.498 18.1709V25.8291L26.1697 22Z"
                              fill="#FF0000"
                            />
                          </svg>
                        );
                      case "instagram":
                        return (
                          <svg
                            width="44"
                            height="44"
                            viewBox="0 0 44 44"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="44"
                              height="44"
                              rx="22"
                              fill="url(#paint0_linear_609_5644)"
                            />
                            <rect
                              width="44"
                              height="44"
                              rx="22"
                              fill="url(#paint1_radial_609_5644)"
                            />
                            <rect
                              width="44"
                              height="44"
                              rx="22"
                              fill="url(#paint2_radial_609_5644)"
                            />
                            <path
                              d="M22.0012 12.3213C19.3723 12.3213 19.0423 12.3328 18.0098 12.3798C16.9793 12.427 16.2759 12.5901 15.6604 12.8295C15.0236 13.0767 14.4836 13.4075 13.9456 13.9457C13.4071 14.4838 13.0763 15.0238 12.8283 15.6603C12.5883 16.2759 12.425 16.9796 12.3786 18.0097C12.3324 19.0422 12.3203 19.3723 12.3203 22.0013C12.3203 24.6303 12.3319 24.9592 12.3788 25.9916C12.4262 27.0222 12.5893 27.7256 12.8285 28.341C13.0759 28.9778 13.4067 29.5178 13.9449 30.0558C14.4828 30.5943 15.0229 30.9259 15.6591 31.1731C16.2751 31.4125 16.9786 31.5756 18.009 31.6228C19.0415 31.6698 19.3712 31.6813 22 31.6813C24.6292 31.6813 24.9581 31.6698 25.9906 31.6228C27.0211 31.5756 27.7254 31.4125 28.3413 31.1731C28.9778 30.9259 29.517 30.5943 30.0548 30.0558C30.5933 29.5178 30.924 28.9778 31.1721 28.3413C31.41 27.7256 31.5734 27.022 31.6218 25.9918C31.6682 24.9594 31.6803 24.6303 31.6803 22.0013C31.6803 19.3723 31.6682 19.0424 31.6218 18.0099C31.5734 16.9794 31.41 16.276 31.1721 15.6606C30.924 15.0238 30.5933 14.4838 30.0548 13.9457C29.5164 13.4073 28.9779 13.0765 28.3407 12.8296C27.7236 12.5901 27.0198 12.4269 25.9892 12.3798C24.9567 12.3328 24.6279 12.3213 21.9982 12.3213H22.0012ZM21.1328 14.0657C21.3906 14.0653 21.6782 14.0657 22.0012 14.0657C24.5858 14.0657 24.8921 14.075 25.9128 14.1214C26.8566 14.1645 27.3688 14.3222 27.7101 14.4547C28.1618 14.6301 28.4839 14.8399 28.8225 15.1788C29.1613 15.5176 29.371 15.8402 29.5468 16.292C29.6794 16.6327 29.8372 17.145 29.8802 18.0888C29.9266 19.1092 29.9367 19.4157 29.9367 21.9991C29.9367 24.5824 29.9266 24.889 29.8802 25.9094C29.837 26.8531 29.6794 27.3654 29.5468 27.7062C29.3714 28.158 29.1613 28.4797 28.8225 28.8183C28.4837 29.1571 28.162 29.3667 27.7101 29.5422C27.3692 29.6753 26.8566 29.8326 25.9128 29.8758C24.8923 29.9222 24.5858 29.9322 22.0012 29.9322C19.4164 29.9322 19.1101 29.9222 18.0897 29.8758C17.1459 29.8322 16.6336 29.6745 16.2921 29.542C15.8404 29.3665 15.5177 29.1569 15.1789 28.8181C14.8401 28.4793 14.6304 28.1574 14.4546 27.7055C14.322 27.3646 14.1642 26.8524 14.1212 25.9086C14.0748 24.8881 14.0655 24.5817 14.0655 21.9966C14.0655 19.4117 14.0748 19.1068 14.1212 18.0863C14.1644 17.1426 14.322 16.6303 14.4546 16.2891C14.6301 15.8373 14.8401 15.5147 15.179 15.1759C15.5178 14.8371 15.8404 14.6273 16.2922 14.4515C16.6334 14.3184 17.1459 14.1611 18.0897 14.1178C18.9827 14.0774 19.3287 14.0653 21.1328 14.0633V14.0657ZM27.1684 15.673C26.5271 15.673 26.0068 16.1928 26.0068 16.8342C26.0068 17.4755 26.5271 17.9957 27.1684 17.9957C27.8097 17.9957 28.33 17.4755 28.33 16.8342C28.33 16.1929 27.8097 15.673 27.1684 15.673ZM22.0012 17.0302C19.2559 17.0302 17.0301 19.256 17.0301 22.0013C17.0301 24.7466 19.2559 26.9713 22.0012 26.9713C24.7465 26.9713 26.9716 24.7466 26.9716 22.0013C26.9716 19.2561 24.7465 17.0302 22.0012 17.0302ZM22.0012 18.7746C23.7832 18.7746 25.2279 20.2191 25.2279 22.0013C25.2279 23.7833 23.7832 25.228 22.0012 25.228C20.2191 25.228 18.7745 23.7833 18.7745 22.0013C18.7745 20.2191 20.2191 18.7746 22.0012 18.7746Z"
                              fill="currentColor"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_609_5644"
                                x1="22"
                                y1="0"
                                x2="22"
                                y2="44"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#116077" />
                                <stop offset="0.0001" stopColor="#23A0C5" />
                                <stop offset="0.9999" stopColor="#10576B" />
                              </linearGradient>
                              <radialGradient
                                id="paint1_radial_609_5644"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(11.6875 47.3889) rotate(-90) scale(43.6073 40.5582)"
                              >
                                <stop stopColor="#FFDD55" />
                                <stop offset="0.1" stopColor="#FFDD55" />
                                <stop offset="0.5" stopColor="#FF543E" />
                                <stop offset="1" stopColor="#C837AB" />
                              </radialGradient>
                              <radialGradient
                                id="paint2_radial_609_5644"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(60.0139 -5.22987) rotate(146.17) scale(48.8138 201.212)"
                              >
                                <stop stopColor="#3771C8" />
                                <stop offset="0.128" stopColor="#3771C8" />
                                <stop
                                  offset="1"
                                  stopColor="#6600FF"
                                  stopOpacity="0"
                                />
                              </radialGradient>
                            </defs>
                          </svg>
                        );
                      case "facebook":
                        return (
                          <svg
                            width="44"
                            height="44"
                            viewBox="0 0 44 44"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="44"
                              height="44"
                              rx="22"
                              fill="url(#paint0_linear_609_5637)"
                            />
                            <rect
                              width="44"
                              height="44"
                              rx="22"
                              fill="#1877F2"
                            />
                            <path
                              d="M24.0532 25.2341H26.9865L28.1598 20.1301H24.0532V17.5781C24.0532 16.2638 24.0532 15.0261 26.3998 15.0261H28.1598V10.7387C27.7773 10.6838 26.333 10.5601 24.8076 10.5601C21.622 10.5601 19.3598 12.6744 19.3598 16.5573V20.1301H15.8398V25.2341H19.3598V36.0801H24.0532V25.2341Z"
                              fill="white"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_609_5637"
                                x1="22"
                                y1="0"
                                x2="22"
                                y2="44"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#116077" />
                                <stop offset="1" stopColor="#10576B" />
                              </linearGradient>
                            </defs>
                          </svg>
                        );
                      case "telegram":
                        return (
                          <svg
                            width="44"
                            height="44"
                            viewBox="0 0 44 44"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="44"
                              height="44"
                              rx="22"
                              fill="url(#paint0_linear_609_5641)"
                            />
                            <rect
                              width="44"
                              height="44"
                              rx="22"
                              fill="#2AABEE"
                            />
                            <path
                              d="M11.0709 20.8992C16.505 18.664 20.1278 17.1903 21.9392 16.4783C27.1171 14.4452 28.1917 14.0921 28.8935 14.0802C29.0479 14.0778 29.3915 14.1139 29.6157 14.2851C29.8021 14.4294 29.8545 14.6247 29.8808 14.7618C29.904 14.8987 29.9361 15.2108 29.9099 15.4545C29.6303 18.2375 28.4159 24.9909 27.7985 28.108C27.5393 29.4269 27.0239 29.8691 26.5259 29.9122C25.4426 30.0063 24.6213 29.2368 23.5729 28.5881C21.9334 27.5725 21.0073 26.9406 19.4143 25.9498C17.5738 24.8047 18.7678 24.1752 19.8162 23.1467C20.09 22.8775 24.8601 18.7814 24.9504 18.4099C24.9621 18.3634 24.9737 18.1902 24.863 18.0989C24.7553 18.0073 24.5951 18.0386 24.4786 18.0634C24.3126 18.0986 21.6946 19.7343 16.6157 22.9702C15.8731 23.4525 15.2004 23.6876 14.5946 23.6753C13.9307 23.6618 12.6493 23.32 11.697 23.0279C10.5321 22.6696 9.60313 22.4801 9.68467 21.8716C9.72545 21.5548 10.1885 21.2305 11.0709 20.8992Z"
                              fill="white"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_609_5641"
                                x1="22"
                                y1="0"
                                x2="22"
                                y2="44"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#116077" />
                                <stop offset="1" stopColor="#10576B" />
                              </linearGradient>
                            </defs>
                          </svg>
                        );
                      default:
                        return null;
                    }
                  })()}
                </i>
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default Social;
