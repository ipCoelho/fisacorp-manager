import React, { useState, useEffect } from 'react';
import './style/index.css';
import { styles } from './style/styles';

export function InputWithLabel({ labelTitle, selectOptions, selectContext, width, onChange, style = {} }) {
  const [title, setTitle] = useState('');
  const [optionsData, setOptionsData] = useState([]);

  useEffect(() => {
    setTitle(labelTitle);
    setOptionsData(selectOptions);
  }, [selectOptions]);

  return (
    <div className='input-with-label-flex-container' style={{ width: width }}>
      <label className='input-with-label-label' htmlFor={selectContext}>
        <span style={styles.span}> * </span> {title}  
      </label>
      {optionsData.length > 0? (
        <select required
          className='input-with-label-select' 
          style={{...style}} 
          name={selectContext} 
          defaultValue='' 
          onChange={(e) => onChange(selectContext, e.target.value)} 
        >
          {optionsData.map((optionContent, index) => {
            switch (selectContext) {
              case 'companies':
                return (
                  <option className='input-with-label-option' key={Number(index + 1)} value={optionContent}>
                    {optionContent}
                  </option>
                );

              case 'users':
                return (
                  <option className='input-with-label-option' key={Number(index + 1)} value={optionContent.UserName}>
                    {optionContent.UserName}
                  </option>
                );

              case 'privileges':
                return (
                  <option className='input-with-label-option' key={Number(index + 1)}  value={optionContent}>
                    {optionContent}
                  </option>
                );
            
              case 'cds':
                return (
                  <option className='input-with-label-option' key={Number(index + 1)} value={optionContent.Name}>
                    {optionContent.Name}
                  </option>
                );
              default:
              break;
            }
          }
        )}
        </select>
      ) : (
        <select required disabled
          className='input-with-label-select' 
          name={selectContext} 
          defaultValue='' 
          onChange={(e) => onChange(selectContext, e.target.value)} 
        >
          <option className='input-with-label-option' value='' disabled>
            Selecione
          </option>
        </select>
      )}
    </div>
  );
}