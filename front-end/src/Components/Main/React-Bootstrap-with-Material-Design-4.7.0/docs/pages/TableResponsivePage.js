import React from 'react';
import { Container, Row, Col, Card, CardBody, Table, TableBody, TableHead  } from 'mdbreact';

const TablePage = (props) => {
  const data = {
    columns: [
      {
        label: '#',
        field: 'id',
        sort: 'asc'
      },
      {
        label: 'Heading',
        field: 'heading0',
        sort: 'asc'
      },
      {
        label: 'Heading',
        field: 'heading1',
        sort: 'asc'
      },
      {
        label: 'Heading',
        field: 'heading2',
        sort: 'asc'
      },
      {
        label: 'Heading',
        field: 'heading3',
        sort: 'asc'
      },
      {
        label: 'Heading',
        field: 'heading4',
        sort: 'asc'
      },
      {
        label: 'Heading',
        field: 'heading5',
        sort: 'asc'
      },
      {
        label: 'Heading',
        field: 'heading6',
        sort: 'asc'
      },
      {
        label: 'Heading',
        field: 'heading7',
        sort: 'asc'
      },
      {
        label: 'Heading',
        field: 'heading8',
        sort: 'asc'
      }
    ],
    rows: [
      {
        'id': 1,
        'heading0': 'Cell',
        'heading1': 'Cell',
        'heading2': 'Cell',
        'heading3': 'Cell',
        'heading4': 'Cell',
        'heading5': 'Cell',
        'heading6': 'Cell',
        'heading7': 'Cell',
        'heading8': 'Cell'
      },
      {
        'id': 2,
        'heading0': 'Cell',
        'heading1': 'Cell',
        'heading2': 'Cell',
        'heading3': 'Cell',
        'heading4': 'Cell',
        'heading5': 'Cell',
        'heading6': 'Cell',
        'heading7': 'Cell',
        'heading8': 'Cell'
      },
      {
        'id': 3,
        'heading0': 'Cell',
        'heading1': 'Cell',
        'heading2': 'Cell',
        'heading3': 'Cell',
        'heading4': 'Cell',
        'heading5': 'Cell',
        'heading6': 'Cell',
        'heading7': 'Cell',
        'heading8': 'Cell'
      }
    ]
  };

  const data_people = {
    columns: [
      {
        label: '#',
        field: 'id',
        sort: 'asc',
      },
      {
        label: 'Name',
        field: 'name',
        sort: 'asc'
      },
      {
        label: 'Surname',
        field: 'surname',
        sort: 'asc'
      },
      {
        label: 'Country',
        field: 'country',
        sort: 'asc'
      },
      {
        label: 'City',
        field: 'city',
        sort: 'asc'
      },
      {
        label: 'Position',
        field: 'position',
        sort: 'asc'
      },
      {
        label: 'Age',
        field: 'age',
        sort: 'asc'
      }
    ],
    rows: [
      {
        'id': '1',
        'name': 'Kate',
        'surname': 'Moss',
        'country': 'USA',
        'city': 'New York City',
        'position': 'Web Designer',
        'age': '23'
      },
      {
        'id': '2',
        'name': 'Anna',
        'surname': 'Wintour',
        'country': 'United Kingdom',
        'city': 'London',
        'position': 'Frontend Developer',
        'age': '36'
      },
      {
        'id': '3',
        'name': 'Tom',
        'surname': 'Bond',
        'country': 'Spain',
        'city': 'Madrid',
        'position': 'Photographer',
        'age': '25'
      },
      {
        'id': '4',
        'name': 'Jerry',
        'surname': 'Horwitz',
        'country': 'Italy',
        'city': 'Bari',
        'position': 'Editor-in-chief',
        'age': '41'
      },
      {
        'id': '5',
        'name': 'Janis',
        'surname': 'Joplin',
        'country': 'Poland',
        'city': 'Warsaw',
        'position': 'Video Maker',
        'age': '39'
      },
      {
        'id': '6',
        'name': 'Gary',
        'surname': 'Winogrand',
        'country': 'Germany',
        'city': 'Berlin',
        'position': 'Photographer',
        'age': '37'
      },
      {
        'id': '7',
        'name': 'Angie',
        'surname': 'Smitd',
        'country': 'USA',
        'city': 'San Francisco',
        'position': 'Teacher',
        'age': '52'
      },
      {
        'id': '8',
        'name': 'John',
        'surname': 'Mattis',
        'country': 'France',
        'city': 'Paris',
        'position': 'Actor',
        'age': '28'
      },
      {
        'id': '9',
        'name': 'Otto',
        'surname': 'Morris',
        'country': 'Germany',
        'city': 'Munich',
        'position': 'Singer',
        'age': '35'
      }
    ]
  };

  const data_minimal_width = {
    columns: [
      {
        label: '#',
        field: 'id',
        sort: 'asc',
        minimal: 'sm'
      },
      {
        label: 'Lorem ipsum dolor',
        field: 'lorem ipsum dolor',
        sort: 'asc',
        minimal: 'lg'
      },
      {
        label: 'Lorem ipsum dolor',
        field: 'lorem ipsum',
        sort: 'asc',
        minimal: 'sm'
      },
      {
        label: 'Lorem ipsum dolor',
        field: 'lorem ',
        sort: 'asc',
        minimal: 'lg'
      }
    ],
    rows: [
      {
        'id': '1',
        'lorem ipsum dolor': 'Lorem ipsum dolor',
        'lorem ipsum': 'Lorem ipsum dolor',
        'lorem': 'Lorem ipsum dolor'
      },
      {
        'id': '2',
        'lorem ipsum dolor': 'Lorem ipsum dolor',
        'lorem ipsum': 'Lorem ipsum dolor',
        'lorem': 'Lorem ipsum dolor'
      },
      {
        'id': '3',
        'lorem ipsum dolor': 'Lorem ipsum dolor',
        'lorem ipsum': 'Lorem ipsum dolor',
        'lorem': 'Lorem ipsum dolor'
      }
    ]
  };


  return(
    <Container className="mt-3">
      <Row className="py-3">
        <Col md="12">
          <Card>
            <CardBody>
              <h2 className="h2-responsive pb-4">Always responsive</h2>
              <Table responsive>
                <TableHead columns={data.columns}/>
                <TableBody rows={data.rows} />
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="py-3">
        <Col md="12">
          <Card>
            <CardBody>
              <h2 className="h2-responsive pb-4">Breakpoint specific</h2>
              <Table responsiveSm>
                <TableHead columns={data.columns} color="primary-color" textWhite />
                <TableBody rows={data.rows} />
              </Table>

              <Table responsiveMd>
                <TableHead columns={data.columns} color="default-color" textWhite />
                <TableBody rows={data.rows} />
              </Table>

              <Table responsiveLg>
                <TableHead columns={data.columns} color="secondary-color" textWhite />
                <TableBody rows={data.rows} />
              </Table>

              <Table responsiveXl>
                <TableHead columns={data.columns} color="success-color" textWhite />
                <TableBody rows={data.rows} />
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="py-3">
        <Col md="12">
          <Card>
            <CardBody>
              <h2 className="h2-responsive pb-4">Columns with auto width</h2>
              <Table autoWidth striped>
                <TableHead columns={data_people.columns}/>
                <TableBody rows={data_people.rows} />
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="py-3">
        <Col md="12">
          <Card>
            <CardBody>
              <h2 className="h2-responsive pb-4">Columns with minimal width</h2>
              <Table striped bordered>
                <TableHead columns={data_minimal_width.columns}/>
                <TableBody rows={data_minimal_width.rows} />
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="py-3">
        <Col md="12">
          <Card>
            <CardBody>
              <h2 className="h2-responsive pb-4">Columns with fixed with</h2>
              <Table fixed bordered>
                <TableHead columns={data_people.columns}/>
                <TableBody rows={data_people.rows} />
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TablePage;