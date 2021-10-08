import { Avatar } from '@material-ui/core'
import { useSelector } from "react-redux"
import { selectEmail, selectProfileURL} from "../features/userSlice"
import useStyles from './styles';

function Icon() {
  const userProfileURL = useSelector(selectProfileURL);
  const userEmail = useSelector(selectEmail);
  const classes = useStyles();

  return (
    <Avatar className={classes.root} src={userProfileURL}>{userEmail[0]}</Avatar>
  )
}

export default Icon
