import { styled } from '@mui/material/styles'

const Root = styled('div')(({ theme }) => ({
  '& > .logo-icon': {
    transition: theme.transitions.create(['width', 'height'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  '& > .badge': {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}))

function Logo() {
  return (
    <Root className="flex items-center">
      <img
        className="logo-icon w-100 "
        src="assets/images/logo/logo-image.png"
        alt="logo"
      />
      {/* <div
        className="badge flex items-center py-4 px-8 mx-8 rounded"
        style={{ backgroundColor: '#121212', color: '#61DAFB' }}
      >
        <img
          className="react-badge"
          src="assets/images/logo/nthgenlogo.png"
          alt="react"
          width="50"
        />
      </div> */}
    </Root>
  )
}

export default Logo
