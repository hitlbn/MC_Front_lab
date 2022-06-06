import {
    Form, Input, Button, Layout, Menu, Row, Col,
    Dropdown, Avatar, Tabs, Table, Alert, Card, List,
    Pagination, Divider, Popconfirm, Modal, Select, Collapse, Descriptions, Radio
} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const components= [
    Form,
    Input,
    Button,
    Layout,
    Menu,
    Row,
    Col,
    Dropdown,
    Avatar,
    Tabs,
    Table,
    Alert,
    Card,
    List,
    Pagination,
    Divider,
    Popconfirm,
    Modal,
    Select,
    Collapse,
    Descriptions,
    Radio,
]
export function setupAntd(app) {
    components.forEach(component => {
        app.use(component)
      })
  }