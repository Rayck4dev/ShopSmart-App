import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9', padding: 20 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 15
  },

  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f97316',
    marginTop: 20
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 8
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 15,
    borderRadius: 4
  },

  checked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50'
  },

  itemText: {
    fontSize: 16
  },

  btnFloating: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#f97316',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },

  modalCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },

  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 8
  },

  qtdRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20
  },

  btnQtd: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8
  },

  inputQtd: {
    width: 50,
    height: 40,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16
  },

  catPill: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10
  },

  activePill: {
    backgroundColor: '#f97316',
    borderColor: '#f97316'
  },

  btn: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderRadius: 10
  }
});