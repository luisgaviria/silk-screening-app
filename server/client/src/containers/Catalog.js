import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import axios from "axios";

const Catalog = (props) => {
  const [state, setState] = useState({
    categories: [],
    category: "",
    items: [],
    page: 1,
    limit: 255,
  });
  useEffect(async () => {
    const { data } = await axios.get("/api/catalog/categories", {
      headers: {
        "Content-type": "application/json",
      },
    });
    setState({ ...state, categories: data.categories });
  }, []);

  useEffect(async () => {
    const { data } = await axios.get(
      `/api/catalog?category=${state.category}&page=${state.page}&limit=${state.limit}`,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    console.log(data);
    setState({
      ...state,
      items: data.items,
      page: data.page,
      limit: data.limit,
    });
  }, [state.category]);

  return (
    <div className=''>
      <h1>Categories</h1>
      <ListGroup>
        {state.categories.map((category) => {
          return (
            <ListGroup.Item
              action
              active={state.category == category ? true : false}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setState({ ...state, category: category });
              }}
            >
              {category}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      {state.category.length ? (
        <div className='item-container'>
          {state.items.map((item, index) => {
            return (
              <div className='not-item-container'>
                <img
                  className='product-image'
                  src={item.FRONT_MODEL_IMAGE_URL}
                />
                <h6>{item.PRODUCT_TITLE}</h6>
                <h6>{item.AVAILABLE_SIZES}</h6>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Catalog;
