import React, { useEffect, useState } from 'react';
import {
  CaretDownOutlined,
  CaretUpOutlined,
  FileOutlined,
} from '@ant-design/icons';
import Flex from './Flex';
import Action from './Action';
import Button from './Button';
import Space from './Space';
import Block from './Block';

const TEXT_OVERFLOW_STYLES = {
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  maxWidth: '100%',
  overflow: 'hidden',
};

function calcPadding(indent) {
  return `(.75x - 1px) (.5x - 1px) (.75x - 1px) (${1.5 * indent + 0.5}x - 1px)`;
}

function extractLeafKeys(subTreeData, foldersOnly) {
  return subTreeData.reduce((list, item) => {
    if (!item.isLeaf) {
      list.push(item.key);
      list.push(...extractLeafKeys(item.children || []));
    } else if (!foldersOnly) {
      list.push(item.key);
    }

    return list;
  }, []);
}

function getItemStyles({ selected }) {
  return {
    width: 'max 100%',
    radius: true,
    textAlign: 'left',
    fill: selected
      ? '#purple.05'
      : {
          '': '#clear',
          hovered: '#dark.04',
        },
    color: selected ? '#purple' : '#dark.75',
    outline: {
      '': '#purple-03.0',
      'focused & focus-visible': '#purple-03',
    },
  };
}

function Item({ children, indent, onClick, selected }) {
  return (
    <Action
      padding={calcPadding(indent)}
      onClick={onClick}
      styles={getItemStyles({ selected })}
      style={{ whiteSpace: 'nowrap' }}
    >
      {children}
    </Action>
  );
}

function sortTreeData(filesTree) {
  filesTree = filesTree.map((item) => {
    return {
      ...item,
      children: item.children ? sortTreeData(item.children) : undefined,
    };
  });

  return filesTree.sort((a, b) => {
    if (!a.isLeaf && b.isLeaf) {
      return -1;
    } else if (!b.isLeaf && a.isLeaf) {
      return 1;
    } else {
      return a.title.localeCompare(b.title, 'en', { sensitivity: 'base' });
    }
  });
}

const HOVER_CSS = `
  &:hover .actions { 
    opacity: 1;
  }
  &:not(:hover) .actions {
    opacity: 0;
  }
`;

export default function DirectoryTree({
  onSelect,
  treeData,
  selectedKey,
  defaultExpandAll,
  rootTitle,
  actionsPanel,
  ...otherProps
}) {
  treeData = sortTreeData(treeData);

  const [expanded, setExpanded] = useState(['/']);
  const [selected, setSelected] = useState();
  const fullTreeData = [
    {
      key: '/',
      title: rootTitle || '/',
      children: treeData,
    },
  ];

  useEffect(() => {
    if (defaultExpandAll) {
      setExpanded(extractLeafKeys(fullTreeData, true));
    }
  }, []);

  function toggle(item) {
    if (expanded.includes(item.key)) {
      setExpanded(expanded.filter((key) => key !== item.key));
    } else {
      setExpanded([...expanded, item.key]);
    }
  }

  function select(item) {
    onSelect && onSelect(item.key);

    setSelected(item.key);
  }

  function recursiveRender(subTreeData, indent = 0) {
    return subTreeData.reduce((list, item) => {
      if (!item.isLeaf) {
        list.push(
          <Item
            key={item.key}
            indent={indent}
            selected={selected === item.key}
            onClick={() => select(item)}
          >
            <Space gap=".5x" css={HOVER_CSS}>
              <Button
                type="clear"
                margin="-.5x"
                padding=".5x"
                color="#purple"
                onClick={() => toggle(item)}
              >
                {expanded.includes(item.key) ? (
                  <CaretUpOutlined />
                ) : (
                  <CaretDownOutlined />
                )}
              </Button>
              <Block style={TEXT_OVERFLOW_STYLES} grow="1">
                {item.title}
              </Block>
              {actionsPanel(item)}
            </Space>
          </Item>,
        );
        if (expanded.includes(item.key)) {
          list.push(...recursiveRender(item.children || [], indent + 1));
        }
      } else {
        list.push(
          <Item
            key={item.key}
            indent={indent}
            selected={selected === item.key}
            onClick={() => select(item)}
          >
            <Space gap="1x" css={HOVER_CSS}>
              <FileOutlined style={{ opacity: 0.66 }} />
              <Block style={TEXT_OVERFLOW_STYLES} grow="1">
                {item.title}
              </Block>
              {actionsPanel(item)}
            </Space>
          </Item>,
        );
      }

      return list;
    }, []);
  }

  return (
    <Flex styles={{ flow: 'column', fontWeight: 500 }} {...otherProps}>
      {recursiveRender(fullTreeData)}
    </Flex>
  );
}
