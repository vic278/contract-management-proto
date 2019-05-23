import React from "react";
import "./App.css";
import { contracts, Nav, PageNav } from "./Utils";
import {
  Collapse,
  Button,
  CardBody,
  Card,
  UncontrolledCollapse,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  CardHeader
} from "reactstrap";
import DatePicker from "react-datepicker";
import matchSorter from "match-sorter";

import ReactTable from "react-table";
import "react-table/react-table.css";
import "react-datepicker/dist/react-datepicker.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      data: contracts,
      collapse: false,
      startDate: new Date()
    };

    this.handleChange = this.handleChange.bind(this);
    this.contract = {};
  }
  handleFormSubmit = e => {
    e.preventDefault();

    this.contract.id = Math.floor(Math.random(0, 100000) + 1);
    this.contract.version = 1.0;
    this.contract.status = "Wartet auf Aktivierung";

    contracts.push(this.contract);
    this.setState({ data: contracts });
    document.getElementById("newContract").reset();
    this.hideForm(e);
    this.contract = {};
  };
  handleChange(date) {
    this.contract.startDate = date;
  }

  fillContract = (key, value) => {
    this.contract[key] = value;
  };

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  showForm(e) {
    e.preventDefault();

    let contractType = this.state.contractType;
    let card;
    if (contractType === "Maintenance") {
      card = document.querySelector("#newMaintenanceCard");
    } else {
      card = document.querySelector("#newContractCard");
    }
    this.contract.contractType = this.state.contractType;
    card.classList.add("show");
    card.classList.remove("hide");
  }

  hideForm(e) {
    let id =
      e.target.dataset.dismiss !== undefined
        ? e.target.dataset.dismiss
        : e.target.parentNode.dataset.dismiss;
    let selector = "#" + id;
    let card = document.querySelector(selector);

    card.classList.add("hide");
    card.classList.remove("show");
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <Nav />
        <PageNav />
        <Form>
          <FormGroup>
            <Input
              type="select"
              name="contractType"
              id="contractType"
              onChange={e => this.setState({ contractType: e.target.value })}
            >
              <option>Select contract type</option>
              <option value="Maintenance">Maintenance</option>
              <option value="AntiSpam">AntiSpam</option>
              <option value="Voice">Voice</option>
            </Input>
            <Input
              type="submit"
              onClick={e => this.showForm(e)}
              className="btn btn-info create-contract ml-2 mt-2"
              value="Create Contract"
            />
          </FormGroup>
        </Form>

        <Collapse id="newContractCard" className="hide">
          <Card>
            <CardHeader>
              <h3>New contract</h3>
              <Button
                type="button"
                className="btn close"
                data-dismiss="newContractCard"
                aria-label="Close"
                onClick={e => this.hideForm(e)}
              >
                <span aria-hidden="true">×</span>
              </Button>
            </CardHeader>
            <CardBody>
              <Form action="#" id="newContract">
                <Label for="customer">Customer</Label>
                <Input
                  type="text"
                  id="customer"
                  name="customer"
                  onChange={e => this.fillContract("customer", e.target.value)}
                />

                <Label for="sapId">SAP customer id</Label>
                <Input
                  type="text"
                  id="sapId"
                  name="sapId"
                  onChange={e => this.fillContract("sapId", e.target.value)}
                />
                <Label for="monthlyCost">Monthly cost</Label>
                <Input
                  type="text"
                  id="monthlyCost"
                  name="monthlyCost"
                  onChange={e =>
                    this.fillContract("monthlyCost", e.target.value)
                  }
                />

                <Input
                  type="submit"
                  onClick={e => this.handleFormSubmit(e)}
                  data-dismiss="newContractCard"
                  className="btn btn-info"
                  value="Submit"
                />
              </Form>
            </CardBody>
          </Card>
        </Collapse>

        <Collapse id="newMaintenanceCard">
          <Card>
            <CardHeader>
              <h3>Maintenance Contract</h3>
              <Button
                type="button"
                className="btn close"
                data-dismiss="newMaintenanceCard"
                aria-label="Close"
                onClick={e => this.hideForm(e)}
              >
                <span aria-hidden="true">×</span>
              </Button>
            </CardHeader>
            <CardBody>
              <Form>
                <Label for="customer">Client</Label>
                <Input
                  type="text"
                  id="customer"
                  name="customer"
                  onChange={e => this.fillContract("customer", e.target.value)}
                />

                <Label for="sapId">SAP customer id</Label>
                <Input
                  type="text"
                  id="sapId"
                  name="sapId"
                  onChange={e => this.fillContract("sapId", e.target.value)}
                />

                <h5>Contract Coverage</h5>
                <Label for="engineerHours">Amount Service Engineer Hours</Label>
                <Input
                  type="text"
                  id="engineerHours"
                  name="engineerHours"
                  onChange={e =>
                    this.fillContract("engineerHours", e.target.value)
                  }
                />
                <Label for="devices">Amount Service Devices</Label>
                <Input
                  type="text"
                  id="devices"
                  name="devices"
                  onChange={e => this.fillContract("devices", e.target.value)}
                />

                <FormGroup>
                  <Label for="serviceLevel">Service Level</Label>
                  <Input
                    type="select"
                    name="serviceLevel"
                    id="serviceLevel"
                    onChange={e =>
                      this.fillContract("serviceLevel", e.target.value)
                    }
                  >
                    <option>Silver</option>
                    <option>Gold</option>
                    <option>Platimun</option>
                  </Input>
                </FormGroup>
                <hr />
                <h5>Contract Duration</h5>
                <FormGroup>
                  <Label for="duration">Months</Label>
                  <Input
                    type="select"
                    name="duration"
                    id="duration"
                    className="ml-2"
                    onChange={e =>
                      this.fillContract("duration", e.target.value)
                    }
                  >
                    <option>12</option>
                    <option>24</option>
                    <option>36</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="contractStart">Contract Start</Label>
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    name="contractStart"
                    id="contractStart"
                    className="ml-2 form-control"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="noticePeriod">Notice Period</Label>
                  <Input
                    type="select"
                    name="noticePeriod"
                    id="noticePeriod"
                    className="ml-2"
                    onChange={e =>
                      this.fillContract("noticePeriod", e.target.value)
                    }
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </Input>
                  <span className="ml-2">Months</span>
                </FormGroup>

                <Input
                  type="submit"
                  onClick={e => this.handleFormSubmit(e)}
                  data-dismiss="newMaintenanceCard"
                  className="btn btn-info"
                  value="Submit"
                />
              </Form>
            </CardBody>
          </Card>
        </Collapse>

        <ReactTable
          data={data}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value
          }
          columns={[
            {
              Header: "Customer",
              accessor: "customer",
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["customer"] }),
              filterAll: true
            },
            {
              Header: "SAP customer id",
              accessor: "sapId",
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["sapId"] }),
              filterAll: true
            },
            {
              Header: "Contract id",
              accessor: "contractId",
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["contractId"] }),
              filterAll: true
            },
            {
              Header: "Contract type",
              accessor: "contractType",
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["contractType"] }),
              filterAll: true,
              Filter: ({ filter, onChange }) => (
                <select
                  onChange={event => onChange(event.target.value)}
                  style={{ width: "100%" }}
                  value={filter ? filter.value : "Maintenace"}
                >
                  <option value="Maintenace">Maintenace</option>
                  <option value="AntiSpam">AntiSpam</option>
                  <option value="Voice">Voice</option>
                  <option value="Hosting">Hosting</option>
                </select>
              )
            },
            {
              Header: "Status",
              accessor: "status",
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["status"] }),
              filterAll: true,
              Filter: ({ filter, onChange }) => (
                <select
                  onChange={event => onChange(event.target.value)}
                  style={{ width: "100%" }}
                  value={filter ? filter.value : "Aktiv"}
                >
                  <option value="Aktiv">Aktiv</option>
                  <option value="Wartet auf Aktivierung">
                    Wartet auf Aktivierung
                  </option>
                  <option value="Gekündigt">Gekündigt</option>
                </select>
              )
            },
            {
              Header: "Version",
              accessor: "version"
            },
            {
              Header: "Monthly cost",
              accessor: "monthlyCost",
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["monthlyCost"] }),
              filterAll: true
            },
            {
              Header: "Last billed date",
              accessor: "lastBilledDate",
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["lastBilledDate"] }),
              filterAll: true
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

export default App;
