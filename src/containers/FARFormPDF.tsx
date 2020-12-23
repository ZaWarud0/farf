import { Page, Text, View, Document, Font } from '@react-pdf/renderer';
import { styles } from './FARFormStyles';
import { AssetFormRow } from '../types';

Font.register({family: 'Oswald', src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf"});

interface FARFormPDF {
  date: string;
  division: string;
  reqNo: string;
  remarks: string;
  rows: Array<AssetFormRow>;
  approvedBy: string;
  preparedBy: string;
}

const FixedAssetFormPDF: React.FC<FARFormPDF> = ({date, division, reqNo, remarks, preparedBy, approvedBy, rows}) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={{fontFamily: 'Oswald', marginHorizontal: 40, paddingBottom: 17.5}}>
            <Text>Fixed Asset Requisition Form</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={[styles.section, styles.sectionA]}>
              <View style={{flex: .35, fontFamily: 'Oswald'}}>
                <Text style={styles.sectionText}>Date:</Text>
                <Text style={styles.sectionText}>Division:</Text>
                <Text style={styles.sectionText}>Requisition No:</Text>
              </View>
              <View style={{flex: .65}}>
                <Text style={styles.sectionText}>{date}</Text>
                <Text style={styles.sectionText}>{division}</Text>
                <Text style={styles.sectionText}>{reqNo}</Text>
              </View>
            </View>
            <View style={[styles.section, styles.sectionB]}>
              <Text style={styles.sectionText}>Remarks:</Text>
              <View>
                <Text>{remarks}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={[styles.headerCell, {flex: .8}]}>
                <Text>No</Text>
              </View>
              <View style={[styles.headerCell, {flex: 2.5}]}>
                <Text>Budget Code</Text>
              </View>
              <View style={[styles.headerCell, {flex: 1.5}]}>
                <Text>Quantity</Text>
              </View>
              <View style={[styles.headerCell, {flex: 5}]}>
                <Text>Description</Text>
              </View>
              <View style={[styles.headerCell, {flex: 3}]}>
                <Text>Budgeted Amount</Text>
              </View>
              <View style={[styles.headerCell, {flex: 3.7}]}>
                <Text>Location</Text>
              </View>
              <View style={[styles.headerCell, {flex: 2}]}>
                <Text>Asset PR ID</Text>
              </View>
              <View style={[styles.headerCell, {flex: 2}]}>
                <Text>Asset Code</Text>
              </View>
            </View>
            { 
              rows.map((row: AssetFormRow, i) => (
                <View key={i} style={styles.tableRow}>
                  <View style={[styles.bodyCell, {flex: .8}]}>
                    <Text>{row.no}</Text>
                  </View>
                  <View style={[styles.bodyCell, {flex: 2.5}]}>
                    <Text>{row.budgetCode}</Text>
                  </View>
                  <View style={[styles.bodyCell, {flex: 1.5}]}>
                    <Text>{row.quantity}</Text>
                  </View>
                  <View style={[styles.bodyCell, {flex: 5}]}>
                    <Text>{row.description}</Text>
                  </View>
                  <View style={[styles.bodyCell, {flex: 3}]}>
                    <Text>{row.budgetedAmount}</Text>
                  </View>
                  <View style={[styles.bodyCell, {flex: 3.7}]}>
                    <Text>{row.location}</Text>
                  </View>
                  <View style={[styles.bodyCell, {flex: 2}]}>
                    <Text>{row.assetPRID}</Text>
                  </View>
                  <View style={[styles.bodyCell, {flex: 2}]}>
                    <Text>{row.assetCode}</Text>
                  </View>
              </View>
              ))  
            } 
          </View>
  
            <View style={[styles.footer, { marginBottom: 5 }]}>
              <View style={{flex: 1}}>
                  <View style={styles.sectionA}>
                    <Text style={{flex: .35}}>Prepared By:</Text>
                    <Text style={{flex: .65}}>{preparedBy}</Text>
                  </View>
              </View>
              <View style={{flex: 1}}>
                  <View style={[styles.sectionB, {flexDirection: 'row'}]}>
                    <Text style={{flex: .35}}>Approved By:</Text>
                    <Text style={{flex: .65}}>{approvedBy}</Text>
                  </View>
              </View>
            </View>
            <View style={[styles.footer, {marginHorizontal: 40, paddingBottom: 20 }]}>
              <View style={{flex: 1}}>
                  <Text>Signature</Text>
              </View>
              <View style={{flex: 1}}>
                <Text>Signature</Text>
              </View>
            </View>
          </View>
       
      </Page>
  
    </Document>
  );

export default FixedAssetFormPDF;