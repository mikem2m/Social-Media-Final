export default ({
    palette: {
      primary: {
        light: '#6ec6ff',
        main: '#2196f3',
        dark: '#0069c0',
        contrastText: '#fafafa',
      },
      secondary: {
        light: '#ffe97d',
        main: '#ffb74d',
        dark: '#c88719',
        contrastText: '#000000',
      },
    },
  
    spreadThis:{
      form:{
        textAlign:'center',
    },
      image:{
        margin: '10px auto 10px auto'
    },
      pageTitle:{
        margin: '10px auto 10px auto'
    },
      textField:{
        margin: '5px auto 5px auto'
    },
      button:{
        marginTop: '30px',
        marginBottom: '30px',
    },
      customError:{
        color: 'red',
        fontSize: '0.8rem',
        marginTop:10,
    },
      progress:{
        
    },
    invisibleSeperator:{
      border:'none',
      margin:4,
    },
    visibleSeperator:{
      width:'100%',
      borderBottom:'1px solid rgba(0,0,0,0.1)',
      marginBottom:20,
    },
    paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: '#2196f3',
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    }
  }
  });