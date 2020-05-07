/* ==================================================================== */
export const BIND_PREFIX = "xl-bind-";

export const cellToInfo = (cell, editor) => {
  let value = editor.graph.getModel().getValue(cell);
  let detail = {};
  Array.from(value && value.attributes || []).forEach((attr) => {
    if (attr.name.indexOf(BIND_PREFIX) === 0) {
      let name = attr.name.slice(BIND_PREFIX.length);
      let val;
      try {
        val = JSON.parse(attr.value);
      } catch (e) {
        val = attr.value;
      }

      if (typeof val !== 'object') {
        val = val + '';
      }
      detail[name] = val
    }

  });

  return {
    cell,
    detail
  }
};

/**
 *  绑定信息设置到图像元素
 * @param info
 * @param editor
 * @param cell
 */
export const infoToCellValue = (info, editor, cell) => {
  let value = editor.graph.getModel().getValue(cell)
  // Converts the value to an XML node
  if (!mxUtils.isNode(value)) {
    let doc = mxUtils.createXmlDocument();
    let obj = doc.createElement('object');
    value = obj;
  } else {
    value = value.cloneNode(true);
  }

  for (let name in info) {
    if (typeof info[name] === 'object') {
      value.setAttribute(BIND_PREFIX + name, JSON.stringify(info[name]))
    } else {
      value.setAttribute(BIND_PREFIX + name, info[name]);

    }
  }

  value.setAttribute('tooltip', "");
  editor.graph.getModel().setValue(cell, value);
};

let
  changeStyle = function (cell, styleObj) {
    let style = {};
    cell.getStyle() && cell.getStyle().split(';').forEach((item) => {
      if (item) {
        let arr = item.split('=');
        style[arr[0]] = arr[1];
      }

    });
    Object.assign(style, styleObj);
    let nStyle = "";
    for (let k in style) {
      nStyle += `${k}=${style[k]};`;
    }
    cell.setStyle(nStyle);
  },
  changeFillColor = function (cell, fillColor) {
    changeStyle(cell, {
      [mxConstants.STYLE_FILLCOLOR]: fillColor
    })
  },
  changeTextColor = function (cell, fontColor) {
    changeStyle(cell, {
      [mxConstants.STYLE_FONTCOLOR]: fontColor
    })
  },
  changeImage = function (cell, image, imageWidth, imageHeight) {
    changeStyle(cell, {
      [mxConstants.STYLE_IMAGE]: image,
      // [mxConstants.STYLE_IMAGE_BACKGROUND] :image,
      // [mxConstants.STYLE_SHAPE] :mxConstants.SHAPE_LABEL,
      // [mxConstants.STYLE_SPACING] :0,
      // [mxConstants.SHADOW_OFFSET_X] :0,
      // [mxConstants.STYLE_STROKEWIDTH] :0,
      [mxConstants.STYLE_IMAGE_WIDTH]: imageWidth,
      [mxConstants.STYLE_IMAGE_HEIGHT]: imageHeight
    })
  };

/**
 * 数据映射到图像
 * @param cell 图像信息
 * @param mappings 映射信息
 * @param data 实际数据
 */
export const mappingDataToCell = (cell, mappings, data) => {
  let val = data && data.val;
  if (val == null) {
    return
  }
  val = Number(val);
  for (let i = 0; i < mappings.length; i++) {
    let m = mappings[i];
    let x1 = Number(m.x1)
    let x2 = Number(m.x2)
    let match = false;
    switch (m.op) {
      case '==':
        match = val === x1;
        break;
      case '><':
        match = val !== x1;
        break;
      case '>':
        match = val > x1;
        break;
      case '>=':
        match = val >= x1;
        break;
      case '<':
        match = val < x1;
        break;
      case '<=':
        match = val <= x1;
        break;
      case '>&<':
        match = val > x1 && val < x2;
        break;
      case '>=&<':
        match = val >= x1 && val < x2;
        break;
      case '>&<=':
        match = val > x1 && val <= x2;
        break;
      case '>=&<=':
        match = val >= x1 && val <= x2;
        break;
    }

    if (match) {
      switch (m.type) {
        case 'text':
          cell.setAttribute('label', m.text);
          break;
        case 'textColor':
          // cell.setAttribute('label', m.color);
          changeTextColor(cell, m.textColor);
          break;
        case 'bgColor':
          // cell.setAttribute('label', m.color);
          changeFillColor(cell, m.bgColor);
          break;
        case 'image':
          // cell.setAttribute('label', m.image);
          // let img = new mxImage(m.image,cell.geometry.width,cell.geometry.height);
          // cell.setGeometry(img);
          changeImage(cell, m.image, cell.geometry.width, cell.geometry.height);
          break;
      }
      // break
    }

  }

  // cell.setStyle(changeImage(cell.getStyle(), imageSrc))
};

/**
 * 获取图像数据中绑定数据类型
 * @param cell
 * @returns {*|string}
 */
export const getCellBindType = (cell) => {
  return cell && cell.getAttribute("xl-bind-type")
}

export const getCellBindCmd = (cell) => {
  return cell && cell.getAttribute("xl-bind-cmdType")
}

/**
 * 获取清除了绑定关系的图像xml
 * @param graphXml
 */
export const getCleanXmlFromGraph = (graphXml) => {
  let reg = `${BIND_PREFIX}[\\S]+="[\\S]*"`;
  // console.log(reg);
  return graphXml.replace(new RegExp(reg, 'g'), '')
};