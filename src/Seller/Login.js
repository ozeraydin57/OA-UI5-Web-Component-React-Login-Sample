import React, { Component } from 'react'
import { Select, Option, Icon, Card, Input, InputType, FlexBox, FlexBoxJustifyContent, FlexBoxWrap, Button, ButtonDesign, MessageToast, FlexBoxDirection } from '@ui5/webcomponents-react';

import { spacing } from "@ui5/webcomponents-react-base";
import { Loader } from '@ui5/webcomponents-react/lib/Loader';
import { LoaderType } from '@ui5/webcomponents-react/lib/LoaderType';

import "@ui5/webcomponents-icons/dist/icons/key";
import "@ui5/webcomponents-icons/dist/icons/add";
import "@ui5/webcomponents-icons/dist/icons/locked";
import "@ui5/webcomponents-icons/dist/icons/user-edit";
import "@ui5/webcomponents/dist/json-imports/i18n.js"
import $ from 'jquery'

import "@ui5/webcomponents/dist/json-imports/i18n.js";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Loading: false,
            UserName: "",
            Password: "",
            UserType: ""
        }
    }

    componentDidMount() {
        // $("body").hide();
    }

    onHandleChange = (event) => {
        debugger;
        this.setState({[event.parameters.name]:event.parameters.value});
    }

    onClickLogin = () => {
        console.log(this.state.UserName);
        this.setState({ Loading: true })


        $.ajax({
            method: "get",
            url: "http://localhost:13984/api/Default",
            data: {
                userName: this.state.UserName,
                password: this.state.Password,
                userType: this.state.UserType
            },
            success: (data) => {
                console.log(data);
                // if (data.Success)
                //     window.location.replace("/main")
                // else
                //     this.setState({ isLoginAtt: false })
            },
            error: (xhr, status, err) => {
                MessageToast.warning("Giriş işlemi yapılamıyor, sistem hatası oluştu, lütfen tekrar deneyiniz");
            },
            complete: (() => {
                // this.setState({ Loading: false });
            })
        });
    }

    render() {
        return (
            <FlexBox
                justifyContent={FlexBoxJustifyContent.Center}
                wrap={FlexBoxWrap.Wrap}>

                {this.state.Loading === true ?
                    <Loader
                        type={LoaderType.Indeterminate}
                        progress={0}
                        delay={0}
                    />
                    : ""}

                <MessageToast></MessageToast>

                <Card avatar={<Icon name="key" />}
                    heading="Bayi Giriş"
                    subtitle=""
                    style={{ maxWidth: "400px", ...spacing.sapUiContentPadding }} >

                    <FlexBox direction={FlexBoxDirection.Column} style={{ ...spacing.sapUiContentPadding }}>
                        <Input icon={<Icon name="user-edit" />} type={InputType.Text} placeholder="Kullanıcı Adı" name="UserName" value={this.state.UserName} onChange={this.onHandleChange} required/>
                        <br /> 
                        <Input icon={<Icon name="locked" />} type={InputType.Password} placeholder="Şifre" name="Password" value={this.state.Password} onChange={this.onHandleChange} />
                        <br />
                        <Select onChange={this.onHandleChange} mame="UserType" value={this.state.UserType}>
                            <Option icon="add" value="Bayi">
                                Bayi
                            </Option>
                            <Option icon="add" value="Admin">Yönetim</Option>
                        </Select>
                        <br />
                        <Button design={ButtonDesign.Emphasized} onClick={this.onClickLogin}>Giriş</Button>

                    </FlexBox>
                </Card>

            </FlexBox>
        )
    }
}
