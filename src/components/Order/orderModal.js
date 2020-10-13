import React,{useState} from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function OrderModal(props) {
        const [modal, setModal] = useState(false);
        const [name,setName] = useState("");
        const [lastName,setLastName] = useState("");
        const [phoneNumber,setPhoneNumber] = useState("");
        const [adress,setAdress] = useState("");

        const changeNameValue = e =>{
            setName(e.currentTarget.value)
        };

    const changeLastNameValue = e =>{
        setName(e.currentTarget.value)
    };
    const changeAddressValue = e =>{
        setAdress(e.currentTarget.value)
    };
    const changePhoneNumberValue = e =>{
        setPhoneNumber(e.currentTarget.value)
    };

        const toggle = () => setModal(!modal);

        return (
            <div>
                <Modal isOpen={modal} toggle={toggle} >
                   <ModalBody>
                       <Form vertical>
                           <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                               <Label for="name" className="mr-sm-2">Name</Label>
                               <Input type="text"  id="lastName" value={name} onChange={changeNameValue} placeholder="Name..." />
                           </FormGroup>
                           <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                               <Label for="text" className="mr-sm-2">Last Name</Label>
                               <Input type="text"  id="exampleEmail" value={lastName} onChange={changeLastNameValue} placeholder="last Name" />
                           </FormGroup>
                           <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                               <Label for="address" className="mr-sm-2">Address</Label>
                               <Input type="text" id="address" value={adress} onChange={changeAddressValue} placeholder="Address.." />
                           </FormGroup>
                           <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                               <Label for="phoneNumber" className="mr-sm-2">Phone Number</Label>
                               <Input type="text"  id="phoneNumber" value={phoneNumber} onChange={changePhoneNumberValue} placeholder="phone.." />
                           </FormGroup>
                           <Button>Заказать</Button>
                       </Form>
                   </ModalBody>
                </Modal>
            </div>
        );

}

export default OrderModal;