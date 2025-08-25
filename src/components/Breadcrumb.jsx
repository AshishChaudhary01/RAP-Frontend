import { Link } from 'react-router'

function Breadcrumb( {items}) {
  return (
    <div className="flex items-center flex-wrap my-4">
      <ul className="flex items-center">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {/* If it's not the last item, render as link */}
            {index !== items.length - 1 ? (
              <Link
                to={item.to}
                className="text-gray-600 hover:text-blue-500 flex items-center"
              >
                {/* Optional: show home icon for first item */}
                {item.icon && (
                  <item.icon className="w-4 h-auto mr-2 text-gray-400" />
                )}
                {item.label}
              </Link>
            ) : (
              <span className="text-indigo-700 font-semibold">{item.label}</span>
            )}

            {/* Separator except for last */}
            {index !== items.length - 1 && (
              <span className="mx-4 h-auto text-gray-400 font-medium">/</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Breadcrumb