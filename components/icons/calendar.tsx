const calendar = ({ color = 'currentColor', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_4_446)">
      <path
        d="M23 3H18V1C18 0.448 17.552 0 17 0C16.448 0 16 0.448 16 1V3H8V1C8 0.448 7.552 0 7 0C6.448 0 6 0.448 6 1V3H1C0.448 3 0 3.448 0 4V22C0 22.552 0.448 23 1 23H9C9.552 23 10 22.552 10 22C10 21.448 9.552 21 9 21H2V7H22V10C22 10.552 22.448 11 23 11C23.552 11 24 10.552 24 10V4C24 3.448 23.552 3 23 3Z"
        fill={color}
      />
      <path
        d="M18 12C14.686 12 12 14.686 12 18C12 21.314 14.686 24 18 24C21.314 24 24 21.314 24 18C24 14.686 21.314 12 18 12ZM21 19H18C17.448 19 17 18.553 17 18V15C17 14.447 17.448 14 18 14C18.552 14 19 14.447 19 15V17H21C21.552 17 22 17.447 22 18C22 18.553 21.552 19 21 19Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="clip0_4_446">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default calendar;
