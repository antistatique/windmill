const dashboard = ({ color = 'currentColor', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 18H6C6.552 18 7 17.552 7 17V8C7 7.448 6.552 7 6 7H4C3.448 7 3 7.448 3 8V17C3 17.552 3.448 18 4 18Z"
      fill={color}
    />
    <path
      d="M11 18H13C13.552 18 14 17.552 14 17V3C14 2.448 13.552 2 13 2H11C10.448 2 10 2.448 10 3V17C10 17.552 10.448 18 11 18Z"
      fill={color}
    />
    <path
      d="M17 12V17C17 17.552 17.448 18 18 18H20C20.552 18 21 17.552 21 17V12C21 11.448 20.552 11 20 11H18C17.448 11 17 11.448 17 12Z"
      fill={color}
    />
    <path
      d="M23 22H1C0.448 22 0 21.552 0 21C0 20.448 0.448 20 1 20H23C23.552 20 24 20.448 24 21C24 21.552 23.552 22 23 22Z"
      fill={color}
    />
  </svg>
);

export default dashboard;
