import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    page: { 
      backgroundColor: 'white',
      paddingBottom: 40,
      paddingTop: 40,
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    section: {
      flexGrow: 1,
      paddingTop: 17.5,
      borderTop: 1,
      borderColor: '#cccccc',
      fontSize: 10,
      fontFamily: 'Oswald',
    },
    sectionA: {
      flex: 1,
      marginLeft: 40,
      flexDirection: 'row',
    },
    sectionB: {
      flex: 1,
      marginRight: 40
    },
    sectionText: {
      paddingBottom: 5 
    },
     table: {
       marginTop: 25,
       marginBottom: 30,
       marginHorizontal: 40,
       borderTop: 1,
       borderBottom: 1,
       borderLeft: 1,
       borderColor: '#cccccc',
       fontSize: 10
     },
     tableRow: {
       flexDirection: 'row', 
     },
     headerCell: {
       fontFamily: 'Oswald',
       paddingLeft: 5,
       paddingVertical: 5,
       borderRight: 1,
       borderBottom: 1,
       borderColor: '#cccccc',
       backgroundColor: '#f0f0f0',
     },
     bodyCell: {
      paddingLeft: 5,
      paddingVertical: 5,
      fontSize: 9,
      borderRight: 1,
      borderColor: '#cccccc',
     },
     footer: {
       fontSize: 10,
       fontFamily: 'Oswald',
       flexDirection: 'row'
     }
  });