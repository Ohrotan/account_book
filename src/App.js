import React, { Component } from 'react';
import { Map, List } from 'immutable';
import firebase from "firebase";
import RForm from './RForm';
import ReceiptForm from './ReceiptForm';
import ReceiptInfoList from './ReceiptInfoList';
import './App.css';

class App extends Component {

  id = 4;

  editData = {
    id: '',
    cardNumber: '',
    useDate: '',
    title: '',
    project: '',
    subtitle: '',
    amount: '',
    note: '',
    modiDate: '',
    modifier: ''
  };

  constructor(props) {
    super(props);

    this.state = {

      receiptList: List([
        Map({
          id: 0,
          cardNumber: '1234(천용희)',
          useDate: '2018-10-01',
          title: '복리후생비',
          project: '웰라이프',
          subtitle: '중식',
          amount: '23,000',
          note: '참여자: 천용희,김서하',
          modiDate: '',
          modifier: ''
        })
        
      ])
    }
  }

  handleCreate = (data) => {
    const { receiptList } = this.state;
    if (data.id === '') {
      data.id = this.id++;
    }
    const mapData = Map({
      ...data
    });
    this.setState({ receiptList: receiptList.push(mapData) });
  }

  handleRemoveF = i => () => {
    alert(i);
    this.setState({ receiptList: this.state.receiptList.delete(i) })
  }

  handleRemove = (list) => {
    if (list.size == 0) {
      alert('선택한 정보가 없습니다.');
    }
    else {
      const ok = window.confirm('해당 차량 정보를 정말 삭제하시겠습니까?');
      if (ok == true) {
        this.setState({ receiptList: this.state.receiptList.filterNot(x => list.includes(x.get('id'))) })
      }
    }
  }


  handleRegister = (id) => {
    const info = this.state.receiptList.find(x => x.get('id') == id);
    this.editData = info;
    this.setState({ formOpen: true });
  }

  handleEdit = (data) => {
    const index = this.state.receiptList.findIndex(info => info.get('id') == data.id);
    this.setState({ receiptList: this.state.receiptList.update(index, val => Map({ ...data })) })
  }

  render() {

    return (
      <div>
        <RForm editData={this.editData} onCreate={this.handleCreate} onEdit={this.handleEdit}></RForm>
        <ReceiptInfoList data={this.state.receiptList} onRemove={this.handleRemove} onRegister={this.handleRegister} />
      </div>
    );
  }
}


export default App;
