import React, { Component } from 'react';
import { List } from 'immutable';
import { Table, Checkbox, Button, Input, Select, Pagination } from 'semantic-ui-react';
import './ReceiptInfoList.css';

class ReceiptInfoList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allChecked: false,
            checkedIDs: List([])
        }
    }

    handleCheck = (e, { value }) => {

        //전체 선택시
        if (value === 'all') {
            this.setState({ allChecked: !this.state.allChecked });

            const { data } = this.props;

            if (this.state.allChecked !== true) {
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

        return (

            <div className="receipt_table">
                <Button inverted color="red" onClick={this.handleRemove}>선택 삭제</Button>
                <Button inverted color="green" onClick={this.props.onRegister}>등록</Button>
              
                <Table selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell><Checkbox name="all" value="all" checked={this.state.allChecked}
                                onChange={this.handleCheck} /></Table.HeaderCell>
                            <Table.HeaderCell>번호</Table.HeaderCell>
                            <Table.HeaderCell>카드</Table.HeaderCell>
                            <Table.HeaderCell>사용일</Table.HeaderCell>
                            <Table.HeaderCell>계정과목</Table.HeaderCell>
                            <Table.HeaderCell>프로젝트</Table.HeaderCell>
                            <Table.HeaderCell>내용</Table.HeaderCell>
                            <Table.HeaderCell>금액</Table.HeaderCell>
                            <Table.HeaderCell>비고</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {data.map((info) => (
                            <Table.Row key={info.get('id')}>
                                <Table.Cell><Checkbox value={info.get('id')} checked={this.state.checkedIDs.includes(info.get('id'))}
                                    onChange={this.handleCheck} /></Table.Cell>
                                <Table.Cell>{info.get('id')}</Table.Cell>
                                <Table.Cell>{info.get('cardNumber')}</Table.Cell>
                                <Table.Cell>{info.get('useDate')}</Table.Cell>
                                <Table.Cell>{info.get('title')}</Table.Cell>
                                <Table.Cell>{info.get('project')}</Table.Cell>
                                <Table.Cell>{info.get('subtitle')}</Table.Cell>
                                <Table.Cell>{info.get('amount')}</Table.Cell>
                                <Table.Cell>{info.get('note')}</Table.Cell>
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
export default ReceiptInfoList;
