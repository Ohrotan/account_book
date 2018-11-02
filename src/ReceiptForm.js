import React, { Component } from 'react';
import { Header, Button, Form, Icon, Modal } from 'semantic-ui-react'

import './ReceiptForm.css';



class ReceiptForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            model: '',
            storeID: '',
            name: ''
        }
    }

    reset() {
        this.setState({ id: '', model: '', storeID: '', name: '' });
    }

    handelCancel = () => {
        this.reset();
        this.props.onClose();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

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
        this.props.onClose();

    }

    setData = () => {
        //정보 수정인 경우 기존 정보 띄우기
        if (this.props.data != null) {
            const editData = this.props.data.toJS();
            this.setState({ id: editData.id, model: editData.model, storeID: editData.storeID, name: editData.name });
        }

    }
    render() {

        return (
            <div>
                <Modal open={this.props.formOpen} onMount={this.setData}>
                    <Modal.Header>
                        <Header>
                            차량 정보
                        </Header>
                    </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <div>

                                <Form.Field>
                                    <label>차량 아이디</label>
                                    <input type="text" name="id" id="name_input" placeholder="차량 아이디"
                                        value={this.state.id} invalid="true" disabled />
                                </Form.Field>
                                <Form.Field>
                                    <label>모델명</label>
                                    <input type="text" name="model" id="name_input" placeholder="모델명"
                                        value={this.state.model} onChange={this.handleChange} />
                                </Form.Field>
                                <Form.Field>
                                    <label>매장 아이디</label>
                                    <input type="text" name="storeID" id="name_input" placeholder="매장 아이디"
                                        value={this.state.storeID} onChange={this.handleChange} />
                                </Form.Field>
                                <Form.Field>
                                    <label>이름</label>
                                    <input type="text" name="name" id="receipt_input" placeholder="이름"
                                        value={this.state.name} onChange={this.handleChange} />
                                </Form.Field>

                                <div className="btn_wrap">
                                    <Button onClick={this.handelCancel}>취소</Button>
                                    <Button positive onClick={this.handleSubmit}>저장</Button>
                                </div>

                            </div>
                        </Form>

                    </Modal.Content>

                </Modal>

            </div>
        );
    }

}

export default ReceiptForm;

