import { StyleSheet } from 'react-native';

  var fXsm = 10;
  var fSm = 12;
  var fMd = 14;
  var fLg = 16;
  var fXlg = 20;
  var mainColor = '#432e5c';
  var secondColor = 'orange';

export default StyleSheet.create({

  //------------------ General Layout -------------------//
  body: {
    flex: 1,
    color: 'black',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  mycontainer: {
    width: '100%',
    padding: 20,
  },
  img: {
  resizeMode: 'contain'
  
  },


  //------------------ Text Style -------------------//
  h1: {
    fontSize: 36,
    color: 'black',
    paddingBottom: 18,
  },
  h2: {
    fontSize: 30,
    color: 'black',
    paddingBottom: 12,
  },
  h3: {
    fontSize: 20,
    color: 'black',
    paddingBottom: 6,
  },
  textMuted: {
    fontSize: fMd,
    color: 'gray'
  },
  
  /*
  fXsm: {
    fontSize: fXsm
  },
  fSm: {
    fontSize: fSm
  },
  fMd: {
    fontSize: fMd
  },
  fLg: {
    fontSize: fLg
  },
  fXlg: {
    fontSize: fXlg
  },*/
  errorMsg: {
    color: 'red',
  },


  //------------------ Alignment -------------------//
  flexStart: {
    width: '100%',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: 'black',
  },


  //------------------ Layout -------------------//
  p1: {
    padding: 4
  },
  p2: {
    padding: 8
  },
  p3: {
    padding: 12
  },
  

  //------------------ Form -------------------//
  select: {},//select not working

  inputBlock: {
    fontSize: fMd,
    width: '100%',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    fontSize: fLg,
    width: '100%',
    padding: 6,
    paddingLeft: 8,
    backgroundColor: '#FFF',
    borderColor: '#CCC',
    borderWidth: 1,

    shadowColor: "#000",    
    shadowOpacity: .1,
    elevation: 1,
  },
  label: {
    color: '#777',
    fontSize: fLg,
    width: '100%',
    padding: 3,
    justifyContent: 'flex-start',
  },
  button: {      
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: mainColor,
  },
  button2: {      
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 5,
    paddingRight: 5,    
    backgroundColor: 'white',
    borderColor: secondColor,
    borderWidth: 2,
  },  
  buttonText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: fMd,
    color: 'white',
  },
  buttonText2: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: fMd,
    color: secondColor,
  },
  selectOutter: {
    height: 42,
    paddingHorizontal: -10,
    paddingVertical: 0,
    borderWidth: 1,
    borderColor: '#CCC',
    color: 'black',
    backgroundColor: 'white',
    shadowColor: "#000",    
    shadowOpacity: .1,
    elevation: 1,
  },
  selectInner: {
      fontSize: 14,
      top: -5
  },

  //------------------------ Home & Order --------------------------------
  
  dashboard: {
    flex: 0.3,
    resizeMode: 'repeat',
    width: '100%',
  },
  onOff1: {
      flex: 1,
      justifyContent: 'center',
      /*borderColor: '#CCC',*/
      borderColor: '#000',
      borderRightWidth: .3,
  },
  onOff2: {
      flex: 1,
      justifyContent: 'center',
      /*borderColor: '#EFEFFF',*/
      borderColor: '#444',
      borderLeftWidth: 1,
  },
  onOffContent: {
      textAlign: 'center',
      alignItems:'center',
      left: 5
  },
  onOffTitle1Off: {
      fontSize: 35,
      color: '#ff6e63',
  },
  onOffTitle1: {
      fontSize: 35,
      color: '#6ABE45',
  },
  onOffTitle2: {
      fontSize: 35,
      color: 'orange',
  },
  onOffLabel1: {
      color: '#6ABE45',
      textAlign: 'center',
      fontSize: 12
  },
  onOffLabel1Off: {
      color: '#ff6e63',
      textAlign: 'center',
      fontSize: 12
  },
  onOffLabel2: {
      color: 'orange',
      textAlign: 'center',
      fontSize: 12
  },



  Font: {
    fontSize: 18,
    justifyContent: 'flex-start',
  },
  FontS: {
      fontSize: 14,
  },
  FontGreenS: {
    fontSize: 14,
    color: '#90c989'
  },
  order: {
      flex: 1,
      
      flexDirection: 'row',
      backgroundColor: '#EFEFEF',
      borderBottomWidth: 1,
      borderBottomColor: '#CCC',
      borderTopWidth: 1,
      borderTopColor: '#FFF',
      paddingVertical: 10,
      paddingHorizontal: 20,
      width: '100%',
  },
  tabActive: {
    flex: 1,
    paddingVertical: 10,
      justifyContent: 'center',
      backgroundColor: '#5ea83d',
      borderLeftColor: '#333',
      borderLeftWidth: 1,
      borderBottomColor: '#4b8731',
      borderBottomWidth: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
      justifyContent: 'center',
      backgroundColor: '#555',
      borderLeftColor: '#333',
      borderLeftWidth: 1,
      borderBottomColor: '#333',
      borderBottomWidth: 4,
  },
  tabContent: {
      textAlign: 'center',
      alignItems:'center',        
      fontSize: 22,
      color: 'white',
  },
  tabLabel: {
      color: 'white',
      textAlign: 'center',
  },


  //------------------------ Home & Order --------------------------------



  //------------------------ Merit Statement --------------------------------
  meritStatement: {
    flex: 1,    
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    paddingVertical: 8,
    paddingHorizontal: 10,
    width: '100%',  
  },
  meritText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'green',
  },
  meritTextRed: {
    textAlign: 'center',
    fontSize: 20,
    color: 'red',
  }
  
      
});




