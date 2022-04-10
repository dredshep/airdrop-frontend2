import * as React from 'react'

const ArrowRightMd = ({ className, ...rest }: { className: string }) => (
  <svg
    width={25}
    height={15}
    viewBox="0 0 25 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
    className={className}
  >
    <path
      d="M24.7071 8.20711C25.0976 7.81658 25.0976 7.18342 24.7071 6.79289L18.3431 0.428932C17.9526 0.0384078 17.3195 0.0384078 16.9289 0.428932C16.5384 0.819457 16.5384 1.45262 16.9289 1.84315L22.5858 7.5L16.9289 13.1569C16.5384 13.5474 16.5384 14.1805 16.9289 14.5711C17.3195 14.9616 17.9526 14.9616 18.3431 14.5711L24.7071 8.20711ZM0 8.5H24V6.5H0V8.5Z"
      // fill={color}
    />
  </svg>
)

export default ArrowRightMd
