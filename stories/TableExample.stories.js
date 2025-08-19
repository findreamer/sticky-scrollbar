import StickyScrollbar from '../src/index';

export default {
  title: 'Examples/TableExample',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const createTable = () => {
  // 创建容器
  const container = document.createElement('div');
  container.style.cssText = `
    height: 400px;
    overflow: auto;
    border: 1px solid #ccc;
  `;
  
  // 创建表格
  const table = document.createElement('table');
  table.style.cssText = `
    border-collapse: collapse;
    min-width: 1200px;
  `;
  
  // 创建表头
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  
  for (let i = 1; i <= 10; i++) {
    const th = document.createElement('th');
    th.style.cssText = `
      padding: 8px;
      border: 1px solid #ddd;
      text-align: left;
      background-color: #f2f2f2;
    `;
    th.textContent = `Column ${i}`;
    headerRow.appendChild(th);
  }
  
  thead.appendChild(headerRow);
  table.appendChild(thead);
  
  // 创建表格内容
  const tbody = document.createElement('tbody');
  
  for (let i = 0; i < 50; i++) {
    const row = document.createElement('tr');
    
    for (let j = 1; j <= 10; j++) {
      const cell = document.createElement('td');
      cell.style.cssText = `
        padding: 8px;
        border: 1px solid #ddd;
        text-align: left;
      `;
      cell.textContent = `Row ${i + 1} - Col ${j}`;
      row.appendChild(cell);
    }
    
    tbody.appendChild(row);
  }
  
  table.appendChild(tbody);
  container.appendChild(table);
  
  // 初始化StickyScrollbar
  setTimeout(() => {
    new StickyScrollbar(container, {
      showMode: 'auto',
      autoHideDelay: 1000,
    });
  }, 0);
  
  return container;
};

export const DataTable = () => createTable();