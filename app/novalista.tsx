import { useRouter } from 'expo-router';
import { ChevronLeft, Layers3, Minus, Plus, ShoppingBasket, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Modal, ScrollView, SectionList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../src/styles/novalistaStyles';

interface Item {
  id: string;
  nome: string;
  qtd: number;
  riscado: boolean;
  categoria: string;
}

const CATEGORIAS = [
  { id: 'Nenhuma', icon: Layers3 },
  { id: 'Frutas e Verduras', icon: ShoppingBasket },
  { id: 'Padaria', icon: ShoppingBasket },
  { id: 'Carnes e Peixes', icon: ShoppingBasket },
  { id: 'Laticínios e Ovos', icon: ShoppingBasket },
];

export default function DetalhesLista() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [itens, setItens] = useState<Item[]>([]);
  const [erro, setErro] = useState(false);
  
  const [nome, setNome] = useState('');
  const [qtd, setQtd] = useState(1);
  const [catSel, setCatSel] = useState('Nenhuma');

  const adicionarItem = () => {
    if (nome.trim() === '') {
      setErro(true);
      return;
    }
    
    // Garante que salve pelo menos 1, caso o usuário tenha deixado 0 ou vazio
    const quantidadeFinal = qtd <= 0 ? 1 : qtd;
    
    const novoItem: Item = { 
      id: Date.now().toString(), 
      nome, 
      qtd: quantidadeFinal, 
      riscado: false, 
      categoria: catSel 
    };
    
    setItens([...itens, novoItem]);
    fecharModal();
  };

  const fecharModal = () => { 
    setModalVisible(false); 
    setNome(''); 
    setQtd(1); 
    setCatSel('Nenhuma'); 
    setErro(false);
  };

  const alternarRisco = (id: string) => {
    setItens(itens.map(i => i.id === id ? { ...i, riscado: !i.riscado } : i));
  };

  const secoes = CATEGORIAS.map(cat => ({
    title: cat.id,
    data: itens.filter(i => i.categoria === cat.id)
  })).filter(s => s.data.length > 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/add')}>
          <ChevronLeft color="#f97316" size={30} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Minha Lista</Text>
      </View>

      <SectionList
        sections={secoes}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { title } }) => <Text style={styles.sectionHeader}>{title}</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => alternarRisco(item.id)}>
            <View style={[styles.checkbox, item.riscado && styles.checked]} />
            <Text style={[styles.itemText, item.riscado && { textDecorationLine: 'line-through', color: '#aaa' }]}>
              {item.nome} x{item.qtd}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.btnFloating} onPress={() => setModalVisible(true)}>
        <Plus color="#FFF" size={30} />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.rowBetween}>
              <Text style={styles.modalTitle}>Adicionar item</Text>
              <TouchableOpacity onPress={fecharModal}><X size={24}/></TouchableOpacity>
            </View>
            
            <TextInput 
              style={[styles.input, erro && { borderColor: 'red', borderBottomWidth: 2 }]} 
              placeholder="Nome do item" 
              value={nome} 
              onChangeText={(t) => { setNome(t); setErro(false); }} 
            />
            {erro && <Text style={{color: 'red', fontSize: 12, marginTop: 5}}>O nome do item é obrigatório!</Text>}
            
            <View style={styles.qtdRow}>
              <Text>Quantidade</Text>
              <View style={styles.row}>
                <TouchableOpacity onPress={() => setQtd(Math.max(1, qtd - 1))} style={styles.btnQtd}><Minus size={20}/></TouchableOpacity>
                
                <TextInput 
                  style={styles.inputQtd} 
                  keyboardType="numeric" 
                  value={qtd === 0 ? '' : String(qtd)}
                  onChangeText={(val) => setQtd(val === '' ? 0 : (parseInt(val) || 0))}
                />
                
                <TouchableOpacity onPress={() => setQtd(qtd + 1)} style={styles.btnQtd}><Plus size={20}/></TouchableOpacity>
              </View>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginVertical: 20}}>
              {CATEGORIAS.map(c => (
                <TouchableOpacity key={c.id} onPress={() => setCatSel(c.id)} style={[styles.catPill, catSel === c.id && styles.activePill]}>
                  <c.icon size={18} color={catSel === c.id ? '#FFF' : '#333'} />
                  <Text style={catSel === c.id ? {color: '#FFF', marginLeft: 5} : {marginLeft: 5}}>{c.id}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.row}>
              <TouchableOpacity style={[styles.btn, {backgroundColor: '#EEE'}]} onPress={fecharModal}><Text>Cancelar</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.btn, {backgroundColor: '#4CAF50'}]} onPress={adicionarItem}><Text style={{color: '#FFF', fontWeight: 'bold'}}>Salvar</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

