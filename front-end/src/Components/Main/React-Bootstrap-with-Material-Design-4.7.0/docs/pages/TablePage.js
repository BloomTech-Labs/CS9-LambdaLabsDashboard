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
        label: 'First',
        field: 'first',
        sort: 'asc'
      },
      {
        label: 'Last',
        field: 'last',
        sort: 'asc'
      },
      {
        label: 'Handle',
        field: 'handle',
        sort: 'asc'
      }
    ],
    rows: [
      {
        'id': 1,
        'first': 'Mark',
        'last': 'Otto',
        'handle': '@mdo'
      },
      {
        'id': 2,
        'first': 'Jacob',
        'last': 'Thornton',
        'handle': '@fat'
      },
      {
        'id': 3,
        'first': 'Larry',
        'last': 'the Bird',
        'handle': '@twitter'
      }
    ]
  };

  const data_collspan = {
    columns: [
      {
        label: '#',
        field: 'id',
        sort: 'asc'
      },
      {
        label: 'First',
        field: 'first',
        sort: 'asc'
      },
      {
        label: 'Last',
        field: 'last',
        sort: 'asc'
      },
      {
        label: 'Handle',
        field: 'handle',
        sort: 'asc'
      }
    ],
    rows: [
      {
        'id': 1,
        'first': 'Mark',
        'last': 'Otto',
        'handle': '@mdo'
      },
      {
        'id': 2,
        'first': 'Jacob',
        'last': 'Thornton',
        'handle': '@fat'
      },
      {
        'id': 3,
        'first': 'Larry the Bird',
        'colspan': 2,
        'handle': '@twitter'
      }
    ]
  };


  const data_responsive = {
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

  return(
    <Container className="mt-3">
      <Row className="py-3">
        <Col md="12">
          <Card>
            <CardBody>
              <h2 className="h2-responsive pb-4">Basic Table</h2>
              <Table>
                <TableHead>
                  <tr>
                    <th>#</th>
                    <th>First</th>
                    <th>Last</th>
                    <th>Handle</th>
                  </tr>
                </TableHead>
                <TableBody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="py-3">
        <Col md="12">
          <Card>
            <CardBody>
              <h2 className="h2-responsive pb-4">Table head options</h2>
              <Table>
                <TableHead columns={data.columns} color="primary-color" textWhite />
                <TableBody rows={data.rows} />
              </Table>

              <Table>
                <TableHead columns={data.columns} color="dark" />
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
              <h2 className="h2-responsive pb-4">Striped rows</h2>
              <Table striped>
                <TableHead columns={data.columns} />
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
              <h2 className="h2-responsive pb-4">Bordered Table</h2>
              <Table bordered>
                <TableHead columns={data_collspan.columns} color="primary-color" textWhite />
                <TableBody rows={data_collspan.rows} />
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="py-3">
        <Col md="12">
          <Card>
            <CardBody>
              <h2 className="h2-responsive pb-4">Borderless Table</h2>
              <Table borderless>
                <TableHead columns={data_collspan.columns} />
                <TableBody rows={data_collspan.rows} />
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="py-3">
        <Col md="12">
          <Card>
            <CardBody>
              <h2 className="h2-responsive pb-4">Hoverable rows</h2>
              <Table hover>
                <TableHead columns={data_collspan.columns} color="secondary-color" textWhite />
                <TableBody rows={data_collspan.rows} />
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="py-3">
        <Col md="12">
          <Card>
            <CardBody>
              <h2 className="h2-responsive pb-4">Samll Table</h2>
              <Table small>
                <TableHead columns={data_collspan.columns} color="primary-color" textWhite />
                <TableBody rows={data_collspan.rows} />
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="py-3">
        <Col md="12">
          <Card>
            <CardBody>
              <h2 className="h2-responsive pb-4">Captions</h2>
              <Table>
                <caption>List of users</caption>
                <TableHead columns={data.columns} color="indigo" textWhite />
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
              <h2 className="h2-responsive pb-4">Responsive Table</h2>
              <Table responsive>
                <TableHead columns={data_responsive.columns} color="primary-color" textWhite />
                <TableBody rows={data_responsive.rows} />
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TablePage;