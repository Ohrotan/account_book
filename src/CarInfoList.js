import React, { Component } from 'react';
import { List } from 'immutable';
import { Table, Checkbox, Button, Input, Select, Pagination } from 'semantic-ui-react';
import './CarInfoList.css';

class CarInfoList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allChecked: false,
            checkedIDs: List([])
        }
    }

    handleCheck = (e, { value }) => {

        //전체 선택시
        if (value == 'all') {
            this.setState({ allChecked: !this.state.allChecked });

            const { data } = this.props;

            if (this.state.allChecked != true) {
                let allID = List([]);
                data.map(info => allID = allID.push(info.get('id')));
                this.setState({ checkedIDs: allID });
            } else {
                this.setState({ checkedIDs: List([]) });
            }

        }

        //개별 선택시
        else {
            if (this.state.checkedIDs.includes(value)) {
                this.setState({ checkedIDs: this.state.checkedIDs.filterNot(x => x == value) });
            } else {
                this.setState({ checkedIDs: this.state.checkedIDs.push(value) });
            }
        }
    }

    handleRemove = () => {
        this.props.onRemove(this.state.checkedIDs);
    }
    handleEdit = (e, { value }) => {
         this.props.onRegister(value);
    }

    render() {
        const { data } = this.props;
        const options = [{ key: 'all', text: '전체', value: 'all' },
        { key: 'id', text: '차량 아이디', value: 'id' },
        { key: 'model', text: '모델명', value: 'model' },
        { key: 'storeID', text: '매장 아이디', value: 'storeID' },
        { key: 'name', text: '이름', value: 'name' },
        ];

        return (

            <div className="car_table">
                <Button inverted color="red" onClick={this.handleRemove}>선택 삭제</Button>
                <Button inverted color="green" onClick={this.props.onRegister}>차량 등록</Button>
                <div className="search_bar">
                    <Input type='text' placeholder='검색어를 입력하세요.' action>
                        <input />
                        <Select options={options} defaultValue='all' />
                        <Button type='submit'>검색</Button>
                    </Input>
                </div>
                <Table selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell><Checkbox name="all" value="all" checked={this.state.allChecked}
                                onChange={this.handleCheck} /></Table.HeaderCell>
                            <Table.HeaderCell>차량 아이디</Table.HeaderCell>
                            <Table.HeaderCell>모델명</Table.HeaderCell>
                            <Table.HeaderCell>매장 아이디</Table.HeaderCell>
                            <Table.HeaderCell>이름</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {data.map((info) => (
                            <Table.Row key={info.get('id')}>
                                <Table.Cell><Checkbox value={info.get('id')} checked={this.state.checkedIDs.includes(info.get('id'))}
                                    onChange={this.handleCheck} /></Table.Cell>
                                <Table.Cell>{info.get('id')}</Table.Cell>
                                <Table.Cell>{info.get('model')}</Table.Cell>
                                <Table.Cell>{info.get('storeID')}</Table.Cell>
                                <Table.Cell>{info.get('name')}</Table.Cell>
                                <Table.Cell>
                                    <Button inverted color="yellow" floated="right"
                                        value={info.get('id')} onClick={this.handleEdit}>수정</Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>

                <Pagination defaultActivePage={1} totalPages={5} />

            </div>
        );
    }
}
export default CarInfoList;
