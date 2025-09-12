import { GeminiScrollbar } from '../src';

export default {
  title: 'Components/GeminiScrollbar',
  argTypes: {
    autoshow: {
      control: 'boolean',
      defaultValue: false,
      description: '是否自动显示滚动条'
    },
    forceGemini: {
      control: 'boolean',
      defaultValue: false,
      description: '是否强制创建滚动条'
    },
    minThumbSize: {
      control: { type: 'number', min: 10, max: 100, step: 1 },
      defaultValue: 20,
      description: '滑块最小尺寸'
    }
  },
};

const Template = (args) => {
  const container = document.createElement('div');
  container.style.width = '400px';
  container.style.height = '300px';
  container.style.border = '1px solid #ccc';
  container.style.position = 'relative';
  container.style.overflow = 'auto';
  
  const content = document.createElement('div');
  content.style.width = '800px';
  content.style.height = '600px';
  content.style.background = 'linear-gradient(45deg, #f3f3f3 25%, transparent 25%, transparent 75%, #f3f3f3 75%, #f3f3f3), linear-gradient(45deg, #f3f3f3 25%, transparent 25%, transparent 75%, #f3f3f3 75%, #f3f3f3)';
  content.style.backgroundSize = '20px 20px';
  content.style.backgroundPosition = '0 0, 10px 10px';
  
  container.appendChild(content);
  
  setTimeout(() => {
    const scrollbar = new GeminiScrollbar({
      element: container,
      ...args
    });
    scrollbar.create();
  }, 0);
  
  return container;
};

export const Default = Template.bind({});
Default.args = {
  autoshow: false,
  forceGemini: true,
  minThumbSize: 20
};

export const AutoShow = Template.bind({});
AutoShow.args = {
  autoshow: true,
  forceGemini: true,
  minThumbSize: 20
};

export const LargeThumb = Template.bind({});
LargeThumb.args = {
  autoshow: false,
  forceGemini: true,
  minThumbSize: 50
};