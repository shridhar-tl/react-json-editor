import ArrayEditor from './ArrayEditor';
import DateEditor from './DateEditor';
import ObjectEditor from './ObjectEditor';
import SimpleEditor from './SimpleEditor';

const editorMap = {
    array: ArrayEditor,
    date: DateEditor,
    object: ObjectEditor
}

export function getComponent(value) {
    if (!value) { return SimpleEditor; }

    let type = typeof value;

    if (type === 'object') {
        type = (Array.isArray(value) ? 'array' : ((value instanceof Date) ? 'date' : type));
    }

    return editorMap[type] || SimpleEditor;
}