import { useState } from "react";
import { BASE_URL, PLACES_API, POPULATE } from "../../constants/api";
import { useForm } from "react-hook-form";
import FormErrorMessage from "../../components/common/FormErrorMessage";
import { useAuth } from "../../context/AuthContext";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";







function Addplace() {
    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [submitSuccessfull, setSubmitSuccessfull] = useState(false);

    const {
        register,
        handleSubmit,
    
        formState: { errors },
      } = useForm();
    
    const [auth] = useAuth();

    async function onSubmitHandler(data, e) {
        setSubmitting(true);
        setError(null);

        const url = BASE_URL + PLACES_API + POPULATE;

        const formData = new FormData();

        const dataApp = JSON.stringify({ 
            name: data.name,
            area: data.area,
            generalabouttext: data.generalabouttext,
            theplacetext: data.theplacetext,
            guestaccesstext: data.guesstaccesstext,
            otherthingsworthnoting: data.otherthingsworthnoting,
            cancellationterms: data.cancellationterms,
            nearbylakeriverwater: data.nearbylakeriverwater == "on" ? true : false,
            heightwithoutrailingsorsafety: data.heightwithoutrailingsorsafety == "on" ? true : false, 
            carbonmonoxidealarm: data.carbonmonoxidealarm == "on" ? true : false,
            smokedetector: data.smokedetector == "on" ? true : false,
            wifi: data.wifi == "on" ? true : false,
            keybox: data.keybox == "on" ? true : false,
            tv: data.tv == "on" ? true : false,
            refrigerator: data.refrigerator == "on" ? true : false,
            washingmachine: data.washingmachine == "on" ? true : false,
            seanearby: data.seanearby == "on" ? true : false,
            niceview: data.niceview == "on" ? true : false,
            freeparking: data.freeparking == "on" ? true : false,
            kitchen: data.kitchen == "on" ? true : false,
            howmanypeople: data.howmanypeople,
            howmanybedrooms: data.howmanybedrooms,
            howmanybathrooms: data.howmanybathrooms,
            howmanybeds: data.howmanybeds,
            ratingdecimal: data.ratingdecimal,
            price: data.price});

        formData.append("files.coverimage", data.coverimage[0]);
        formData.append("files.image2", data.image2[0]);
        formData.append("files.image3", data.image3[0]);
        formData.append("files.image4", data.image4[0]);
        formData.append("data", dataApp);

        const options = {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${auth}`,
            },
        };

        try {
            const response = await fetch(url, options);
            const json = await response.json();
            console.log(json);
            e.target.reset();
            setSubmitSuccessfull(json);
            navigate("/admin/place/added");

        }   catch (error) {
            console.log("error, invalid inputs", error);
            setError(error.toString());
        }   finally {
            setSubmitting(false);
        }
    }


  return (
    <Container className="my-5">
      <Row>
        <h4>Add new place</h4>
      </Row>
      <Form onSubmit={handleSubmit(onSubmitHandler)}>
        <fieldset disabled={submitting}>
          <Row>
            <Col className="px-5" xs={12} sm={12} md={6}>
              <h5 className="px-5" xs={12} sm={12} md={6}>About this place</h5>
              <Row className="mx-1">
                <h6 className="mt-3 mb-2">Name</h6>
                <Col xs={12} sm={12} md={12} >
                  <input placeholder="Name" type="text" {...register("name", { required: true, minLength: 5 })} className="inputs input__borderradius--small"/>
                  {errors.name && <span>Name must contain over 5 characters</span>}
                </Col>
              </Row>
              <Row className="mx-1 mb-2">
                <h6 className="mt-4 mb-2">Area</h6>
                <Col xs={12} sm={12} md={12}>
                  <input placeholder="Area" type="text" {...register("area", { required: true, minLength: 2 })} className="inputs input__borderradius--small"/>
                  {errors.area && <span>Area must contain over 2 characters</span>}
                </Col>
              </Row>
              <Row className="mx-1">
                <h6 className="mt-2 mb-2">General about text</h6>
                <Col xs={12} sm={12} md={12}>
                  <textarea placeholder="General about text" type="text" rows={5} {...register("generalabouttext", { required: true, minLength: 25 })} className="textarea"/>
                  {errors.generalabouttext && <span>This text must contain over 25 characters</span>}
                </Col>
              </Row>
              <Row className="mx-1">
                <h6 className="mt-2 mb-2">The place</h6>
                <Col xs={12} sm={12} md={12}>
                  <textarea placeholder="The place" type="text" rows={5} {...register("theplacetext", { required: true, minLength: 25 })} className="textarea"/>
                  {errors.theplacetext && <span>This text must contain over 25 characters</span>}
                </Col>
              </Row>
              <Row className="mx-1">
                <h6 className="mt-2 mb-2">Guest access</h6>
                <Col xs={12} sm={12} md={12}>
                  <textarea placeholder="Guest access" type="text" rows={5} {...register("guestaccesstext", { required: true, minLength: 25 })} className="textarea"/>
                  {errors.guestaccesstext && <span>This text must contain over 25 characters</span>}
                </Col>
              </Row>
              <Row className="mx-1">
                <h6 className="mt-2 mb-2">Other things worth noting</h6>
                <Col xs={12} sm={12} md={12}>
                  <textarea placeholder="Other things worth noting" type="text" rows={5} {...register("otherthingsworthnotingtext", { required: true, minLength: 15 })} className="textarea"/>
                  {errors.otherthingsworthnotingtext && <span>This text must contain over 15 characters</span>}
                </Col>
              </Row>
              <Row className="mx-1">
                <h6 className="mt-2 mb-2">Cancellation terms</h6>
                <Col xs={12} sm={12} md={12}>
                  <textarea placeholder="Cancellation terms" type="text" rows={5} {...register("cancellationterms", { required: true, minLength: 15  })} className="textarea"/>
                  {errors.cancellationterms && <span>This text must contain over 15 characters</span>}
                </Col>
              </Row>

              <h5 className="mt-5 mx-3">Health and safety</h5>

              <Row className="mx-1 my-4">
                <Col xs={12} sm={12} md={12}>
                        <Form.Check type={'radio'} style={{ paddingLeft: 0 }}  className="d-flex justify-content-between">
                                    <Form.Check.Label className="">{`Nearby lake, river, water`}</Form.Check.Label>
                                    <Form.Check.Input type={'radio'} {...register("nearbylakeriverwater", { required: false })} />
                        </Form.Check>
                </Col>
                <Col xs={12} sm={12} md={12}>
                        <Form.Check type={'radio'} style={{ paddingLeft: 0 }} className="d-flex justify-content-between">
                                    <Form.Check.Label className="">{`Height without railings or safety`}</Form.Check.Label>
                                    <Form.Check.Input type={'radio'}  {...register("heightwithoutrailingsorsafety", { required: false })} />
                        </Form.Check>
                </Col>
                <Col xs={12} sm={12} md={12}>
                            <Form.Check type={'radio'} style={{ paddingLeft: 0 }} className="d-flex justify-content-between">
                                    <Form.Check.Label className="">{`Carbon Monoxide Alarm`}</Form.Check.Label>
                                    <Form.Check.Input type={'radio'}  {...register("carbonmonoxidealarm", { required: false })} />
                            </Form.Check>
                </Col>
                <Col xs={12} sm={12} md={12}>
                            <Form.Check type={'radio'} style={{ paddingLeft: 0 }} className="d-flex justify-content-between">
                                    <Form.Check.Label className="">{`Smoke detector`}</Form.Check.Label>
                                    <Form.Check.Input type={'radio'}  {...register("smokedetector", { required: false })} />
                            </Form.Check>
                </Col>
              </Row>
            </Col>

            <Col className="px-5" xs={12} sm={12} md={6}>

                <h5 className="mt-5 mx-3">This place offers</h5>

                <Row className="mx-1 my-4">
                    <Col xs={12} sm={12} md={12}>
                            <Form.Check type={'radio'} style={{ paddingLeft: 0 }} className="d-flex justify-content-between">
                                    <Form.Check.Label className="">{`Wifi`}</Form.Check.Label>
                                    <Form.Check.Input type={'radio'} {...register("wifi", { required: false })} />
                            </Form.Check>
                    </Col>
                    <Col xs={12} sm={12} md={12}>
                            <Form.Check type={'radio'} style={{ paddingLeft: 0 }} className="d-flex justify-content-between">
                                    <Form.Check.Label className="">{`Key box`}</Form.Check.Label>
                                    <Form.Check.Input type={'radio'} {...register("keybox", { required: false })} />
                            </Form.Check>
                    </Col>
                    <Col xs={12} sm={12} md={12}>
                            <Form.Check type={'radio'} style={{ paddingLeft: 0 }} className="d-flex justify-content-between">
                                    <Form.Check.Label className="">{`Tv`}</Form.Check.Label>
                                    <Form.Check.Input type={'radio'} {...register("tv", { required: false })} />
                            </Form.Check>
                    </Col>
                    <Col xs={12} sm={12} md={12}>
                            <Form.Check type={'radio'} style={{ paddingLeft: 0 }} className="d-flex justify-content-between">
                                    <Form.Check.Label className="">{`Refrigerator`}</Form.Check.Label>
                                    <Form.Check.Input type={'radio'} {...register("refrigerator", { required: false })} />
                            </Form.Check>
                    </Col>
                    <Col xs={12} sm={12} md={12}>
                            <Form.Check type={'radio'} style={{ paddingLeft: 0 }} className="d-flex justify-content-between">
                                    <Form.Check.Label className="">{`Washing Machine`}</Form.Check.Label>
                                    <Form.Check.Input type={'radio'} {...register("washingmachine", { required: false })} />
                            </Form.Check>
                    </Col>
                    <Col xs={12} sm={12} md={12}>
                            <Form.Check type={'radio'} style={{ paddingLeft: 0 }} className="d-flex justify-content-between">
                                    <Form.Check.Label className="">{`Sea Nearby`}</Form.Check.Label>
                                    <Form.Check.Input type={'radio'} {...register("seanearby", { required: false })} />
                            </Form.Check>
                    </Col>
                    <Col xs={12} sm={12} md={12}>
                            <Form.Check type={'radio'} style={{ paddingLeft: 0 }} className="d-flex justify-content-between">
                                    <Form.Check.Label className="">{`Nice view`}</Form.Check.Label>
                                    <Form.Check.Input type={'radio'} {...register("niceview", { required: false })} />
                            </Form.Check>
                    </Col>
                    <Col xs={12} sm={12} md={12}>
                            <Form.Check type={'radio'} style={{ paddingLeft: 0 }} className="d-flex justify-content-between">
                                    <Form.Check.Label className="">{`Free parking`}</Form.Check.Label>
                                    <Form.Check.Input type={'radio'} {...register("freeparking", { required: false })} />
                            </Form.Check>
                    </Col>
                    <Col xs={12} sm={12} md={12}>
                            <Form.Check type={'radio'} style={{ paddingLeft: 0 }} className="d-flex justify-content-between">
                                    <Form.Check.Label className="">{`Kitchen`}</Form.Check.Label>
                                    <Form.Check.Input type={'radio'} {...register("kitchen", { required: false })} />
                            </Form.Check>
                    </Col>
                </Row>

                <h5 className="mt-5 mx-3">How many?</h5>

                <Row className="mx-1 my-4">
                    <Col xs={12} sm={12} md={12}>
                                <Form.Check type={'radio'} style={{ paddingLeft: 0 }} className="d-flex justify-content-between">
                                    <Form.Check.Label>{`People`}</Form.Check.Label>
                                    <input className="inputs input__borderradius--small input__small--width" type={'text'} {...register("howmanypeople", { required: true })}/>
                                </Form.Check>
                                {errors.howmanypeople && <span>This field is required</span>}
                    </Col>
                    <Col xs={12} sm={12} md={12}>
                                <Form.Check type={'radio'} style={{ paddingLeft: 0 }} className="d-flex justify-content-between">
                                    <Form.Check.Label className="">{`Bedroom(s)`}</Form.Check.Label>
                                    <input className="inputs input__borderradius--small input__small--width" type={'text'} {...register("howmanybedrooms", { required: true })}/>
                                </Form.Check>
                                {errors.howmanybedrooms && <span>This field is required</span>}
                    </Col>
                    <Col xs={12} sm={12} md={12}>
                                <Form.Check type={'radio'} style={{ paddingLeft: 0 }} className="d-flex justify-content-between">
                                    <Form.Check.Label className="">{`Bathroom(s)`}</Form.Check.Label>
                                    <input className="inputs input__borderradius--small input__small--width" type={'text'} {...register("howmanybathrooms", { required: true })}/>
                                </Form.Check>
                                {errors.howmanybathrooms && <span>This field is required</span>}
                    </Col>
                    <Col xs={12} sm={12} md={12}>
                                <Form.Check type={'radio'} style={{ paddingLeft: 0 }} className="d-flex justify-content-between">
                                    <Form.Check.Label className="">{`Bed(s)`}</Form.Check.Label>
                                    <input className="inputs input__borderradius--small input__small--width" type={'text'} {...register("howmanybeds", { required: true })}/>
                                </Form.Check>
                                {errors.howmanybeds && <span>This field is required</span>}
                    </Col>
                </Row>


                <Row className="mb-2">
                    <h5 className="mt-5 mx-3">Images</h5>
                    <p className="mx-3">Please choose 5 images, and upload them</p>
                    <Col xs={12} sm={12} md={12} className="mx-3">
                        <div>
                            <input
                            placeholder="File"
                            type="file"
                            {...register("coverimage", { required: true })}
                            />
                            <span>{errors.title?.message}</span>
                        </div>
                        <div>
                            <input
                            placeholder="File"
                            type="file"
                            {...register("image2", { required: true })}
                            />
                            <span>{errors.title?.message}</span>
                        </div>
                        <div>
                            <input
                            placeholder="File"
                            type="file"
                            {...register("image3", { required: true })}
                            />
                            <span>{errors.title?.message}</span>
                        </div>
                        <div>
                            <input
                            placeholder="File"
                            type="file"
                            {...register("image4", { required: true })}
                            />
                            <span>{errors.title?.message}</span>
                        </div>
                        <div>
                            <input
                            placeholder="File"
                            type="file"
                            {...register("image5", { required: true })}
                            />
                            <span>{errors.title?.message}</span>
                        </div>
                        
                    </Col>
                </Row>

                <h5 className="mt-5 mx-3">Rating</h5>

                <Row className="mx-1 my-4">
                    <Col xs={12} sm={12} md={12} style={{ paddingLeft: 0 }} className="d-flex justify-content-between">
                        <p className="mx-3">Rate the place with decimals (4.75) </p>
                        <input type="text" {...register("ratingdecimal", { required: true })} className="inputs input__borderradius--small input__small--width" />
                    </Col>
                    {errors.ratingdecimal && <span>Write in this form(4.75)</span>}
                </Row>

                <h5 className="mt-5 mx-3">Price</h5>

                <Row className="mx-1 my-4">
                    <Col xs={12} sm={12} md={12}>
                            <Form.Check type={'radio'} style={{ paddingLeft: 0 }} className="d-flex justify-content-between">
                                        <Form.Check.Label className="">{`Price ( NOK )`}</Form.Check.Label>
                                        <input type={'text'} className="inputs input__borderradius--small input__small--width"{...register("price", { required: true })} /> kr night
                            </Form.Check>
                            {errors.price && <span>Write only with numbers</span>}
                    </Col>
                </Row>
            </Col>

          </Row>
          <Row>
                <Button
                  type="submit"
                >
                  {submitting ? "Adding place..." : "Add place"}
                </Button>
          </Row>
        </fieldset>
      </Form>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
      {submitSuccessfull && <div>Place added</div>}
    </Container>
  );
}

export default Addplace