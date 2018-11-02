import React, {Component} from 'react';
import {Select, Input, Button, Dropdown} from 'semantic-ui-react';
import moment from 'moment';
import './RForm.css';

class RForm extends Component {
  constructor(props) {
    super(props);
    const today = moment().format('YYYY-MM-DD');
    this.state = {
      id: '', //고유 아이디
      cardNumber: '1234',
      useDate: today,
      title: '복리후생비',
      project: '',
      subtitle: '',
      amount: '',
      note: '',
      modiDate: '',
      modifier: ''
    }
  }

  reset() {
    this.setState({
      id: '',
      cardNumber: '1234',
      useDate: moment().format('YYYY-MM-DD'),
      title: '복리후생비',
      project: '',
      subtitle: '',
      amount: '',
      note: '',
      modiDate: '',
      modifier: ''
    });
  }

  handleChange = (e, data = {}) => {
    console.log(data.name);
    this.setState({
      [data.name]: data.value
    })
  };


  handleSubmit = () => {
    //새로 등록하는 경우
    if (this.state.id === '') {
      this.props.onCreate(this.state);
    }
    //기존 정보를 수정하는 경우
    else {
      this.props.onEdit(this.state);
    }

    this.reset();
  };

  setData = () => {
    //정보 수정인 경우 기존 정보 띄우기
    if (this.props.editData !== null) {
      const editData = this.props.editData;
      this.setState({
        id: editData.id,
        cardNumber: editData.cardNumber,
        useDate: editData.useDate,
        title: editData.title,
        project: editData.project,
        subtitle: editData.subtitle,
        amount: editData.amount,
        note: editData.note,
        modiDate: editData.modiDate,
        modifier: editData.modifier
      });
    }

  }


  render() {
    //console.log(this.state);
    const cardNum = [
      {key: 'c1', value: '1234', text: '1234(천용희)'},
      {key: 'c2', value: '5678', text: '5678(김서하)'}
    ];

    const titles = [
      {key: 'c1', value: '복리후생비', text: '복리후생비'},
      {key: 'c2', value: '여비교통비', text: '여비교통비'}
    ];

    return (
      <div className="rct_form">
        <label>카드</label>
        <Select name="cardNumber" options={cardNum} value={this.state.cardNumber}
                onChange={this.handleChange}/>

        <label>사용일자</label> <Input type="date" name="useDate" value={this.state.useDate}
                                   onChange={this.handleChange}/>

        <label>계정과목</label>
        <Select name="title" options={titles} value={this.state.title}
                onChange={this.handleChange}/>

        <label>프로젝트</label><Input type="text" name="project" value={this.state.project}
                                  onChange={this.handleChange}/>

        <label>사용내역</label> <Input type="text" name="subtitle" value={this.state.subtitle}
                                   onChange={this.handleChange}/>

        <label>금액</label> <Input type="number" name="amount" value={this.state.amount}
                                 onChange={this.handleChange}/>

        <label>비고</label> <Input type="text" name="note" value={this.state.note} placeholder="참석자:"
                                 onChange={this.handleChange}/>

        <Button positive type="button" id="rct_submit" onClick={this.handleSubmit}>등록</Button>
      </div>
    );
  }
}

export default RForm; 