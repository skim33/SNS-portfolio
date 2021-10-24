import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    height: "150px", 
    width: "150px", 
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    top: '312px',
    border: '5px solid #fff',
    animation: `$highlight 1.5s`,
    animationDelay: '2.2s',
  },
  "@keyframes highlight": {
    "0%": {
      border: '5px solid #2a2f3c'
    },

    "50%": {
      border: '5px solid #6b969d'
    },

    "100%": {
      border: '5px solid #fff'
    }
  },
}));