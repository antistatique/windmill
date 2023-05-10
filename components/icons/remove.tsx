const remove = ({ color = 'currentColor', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_4_412)">
      <path
        d="M23 4H17V1C17 0.448 16.552 0 16 0H8C7.448 0 7 0.448 7 1V4H1C0.448 4 0 4.448 0 5C0 5.552 0.448 6 1 6H23C23.552 6 24 5.552 24 5C24 4.448 23.552 4 23 4ZM9 2H15V4H9V2Z"
        fill={color}
      />
      <path
        d="M3 8V21C3 22.657 4.343 24 6 24H18C19.657 24 21 22.657 21 21V8H3ZM9 18C9 18.552 8.553 19 8 19C7.447 19 7 18.552 7 18V13C7 12.448 7.447 12 8 12C8.553 12 9 12.448 9 13V18ZM13 18C13 18.552 12.553 19 12 19C11.447 19 11 18.552 11 18V13C11 12.448 11.447 12 12 12C12.553 12 13 12.448 13 13V18ZM17 18C17 18.552 16.553 19 16 19C15.447 19 15 18.552 15 18V13C15 12.448 15.447 12 16 12C16.553 12 17 12.448 17 13V18Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="clip0_4_412">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default remove;
