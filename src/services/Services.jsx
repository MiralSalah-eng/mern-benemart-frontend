import React from 'react'
import { Container,Row ,Col } from 'reactstrap'
import './Services.css'

const Services = () => {

    const servicesItems = [
        {
            class:"ri-truck-line",
            title:"Free Shipping",
            description : 'Lorem ipsum dolor sit amet consectetur adipisicing.',
            style:'var(--card-bg-01)'
        },
        {
            class:"ri-restart-line",
            title:"Easy Returns",
            description : 'Lorem ipsum dolor sit amet consectetur adipisicing.',
            style:'var(--card-bg-02)'

        },
        {
            class:"ri-secure-payment-line",
            title:"Secure Payment",
            description : 'Lorem ipsum dolor sit amet consectetur adipisicing.',
            style:'var(--card-bg-03)'

        },
        {
            class:"ri-exchange-dollar-line",
            title:"Back Guarantee",
            description : 'Lorem ipsum dolor sit amet consectetur adipisicing.',
            style:'var(--card-bg-04)'

        },
    ]

  return (
    <section className='services'>
    <Container>
    <Row>
            {servicesItems.map((item,index)=>(
                <Col className='mb-3' key={index} lg='3' md='4'>
                    <div style={{backgroundColor: `${item.style}`}} className='service_item'>
                  
                             <span>
                             <i className={item.class}></i>
                             </span>
                             <div>
                                 <h3>{item.title}</h3>
                                 <p>{item.description}</p>
                             </div>
             
                       
                    </div>
                </Col>
             ))}
            </Row>
    </Container>
    </section>
    )
}

export default Services