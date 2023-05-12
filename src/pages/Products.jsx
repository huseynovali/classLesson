import { useEffect, useState } from "react";
import { Layout } from "../components/Layout"
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Input
  } from "reactstrap";
import axios from "axios";
import _ from 'lodash'

export const ProductsPage = () => {
    const [data, setData]=useState({})
    const [currentPage,setCurrenpage]=useState(1)
    const getData=()=>{
        axios.get(`https://reqres.in/api/products?per_page=4&page=${currentPage}`).then(({data})=>{
            setData(data)
        })
    }
    useEffect(()=>{
        getData()
    },[currentPage])
    const totalPage=data.total_pages
    const changeValueHanler=(ev)=>{
        setCurrenpage(ev.target.value)
    }
 

    return (
        <Layout>
            <Row>
                {data.data && data.data.map(({id,name,year,color})=>(
                    <Col xs={6}>
                    <Card key={id} className="mt-3">
                        <CardHeader>Name:{name}</CardHeader>
                        <CardBody>
                            <div className="d-flex justify-content-between">
                                <div>
                                    year:{year}
                                </div>
                                <div className="d-flex align-items-center">
                                    color:<span className="ms-3" style={{height:32,width:32,borderRadius:'50%',backgroundColor:color,display:'inline-block'}}></span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                ))}
            </Row>
            <Row>
                <Col className="mt-3" xs={1}>
                <Input
                type="select"
                value={currentPage}
                onChange={changeValueHanler}
          >
            {
            _.range(1,totalPage+1).map((i)=>(
                <option value={i}>{i}</option>
            ))
            }
           
          </Input>
                </Col>
            </Row>
        </Layout>
    )
}