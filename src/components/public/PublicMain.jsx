import { Outlet } from 'react-router';

function PublicMain() {
  return (
    <main>
      <div><Outlet /></div>
    </main>
  )
}

export default PublicMain