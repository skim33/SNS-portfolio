import { useSelector } from "react-redux"
import { selectEmail, selectProfileURL} from "../features/userSlice"

import { Avatar } from '@material-ui/core'

import useStyles from './styles'

function PortfolioIcon() {
  const userProfileURL = useSelector(selectProfileURL);
  const userEmail = useSelector(selectEmail);
  const classes = useStyles();

  return (
    <Avatar className={classes.root} src={userProfileURL}>{userEmail[0]}</Avatar>
  )
}

export default PortfolioIcon
