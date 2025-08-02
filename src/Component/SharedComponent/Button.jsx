import React from 'react'

export default function Button({label,
  className = '',
  onClick,
  type = ''}) {
  return (
    <div>
        <button onClick={onClick} type={type} className={`cursor-pointer px-2 py-1 ${className}` }>
            {label}</button>
    </div>
  )
}
