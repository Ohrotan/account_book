import React, { Component } from 'react';
import { Map, List } from 'immutable';
import CarForm from './CarForm';
import CarInfoList from './CarInfoList';
import './App.css';

class App extends Component {

  id = 4;

  editData = {
    id: -1,
    model: '',
    storeID: '',
    name: ''
  };

  constructor(props) {
    super(props);

    this.state = {
      formOpen: false,

      carlist: List([
        Map({
          id: 0,
          model: '2017 모닝',
          storeID: '001',
          name: '회색 모닝'
        }),
        Map({
          id: 1,
          model: '2017 모닝',
          storeID: '001',
          name: '빨간 모닝'
        }),
        Map({
          id: 2,
          model: '2017 아반떼',
          storeID: '002',
          name: '하얀 아반떼'
        }),
        Map({
          id: 3,
          model: '2017 그랜저',
          storeID: '003',
          name: '검정 그랜저'
        })
      ])
    }
  }

  handleCreate = (data) => {
    const { carlist } = this.state;
    if (data.id === '') {
      data.id = this.id++;
    }
    const mapData = Map({
      ...data
    });
    this.setState({ carlist: carlist.push(mapData) });
  }

  handleRemoveF = i => () => {
    alert(i);
    this.setState({ carlist: this.state.carlist.delete(i) })
  }

  handleRemove = (list) => {
    if (list.size == 0) {
      alert('선택한 정보가 없습니다.');
    }
    else {
      const ok = window.confirm('해당 차량 정보를 정말 삭제하시겠습니까?');
      if (ok == true) {
        this.setState({ carlist: this.state.carlist.filterNot(x => list.includes(x.get('id'))) })
      }
    }
  }


  handleRegister = (id) => {
    const carInfo = this.state.carlist.find(x => x.get('id') == id);
    this.editData = carInfo;
    this.setState({ formOpen: true });
  }

  handleClose = () => {
    this.setState({ formOpen: false })
  }

  handleEdit = (data) => {
    const index = this.state.carlist.findIndex(info => info.get('id') == data.id);
    this.setState({ carlist: this.state.carlist.update(index, val => Map({ ...data })) })
  }

  render() {

    return (
      <div>
        <CarForm data={this.editData} onCreate={this.handleCreate} formOpen={this.state.formOpen} onClose={this.handleClose} onEdit={this.handleEdit} />
        <CarInfoList data={this.state.carlist} onRemove={this.handleRemove} onRegister={this.handleRegister} />
      </div>
    );
  }
}


export default App;
