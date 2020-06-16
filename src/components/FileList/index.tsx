import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

import { Container, FileInfo } from './styles';

interface FileProps {
  name: string;
  readableSize: string;
}

interface FileListProps {
  files: FileProps[];
  onDelete: Function;
}

const FileList: React.FC<FileListProps> = ({
  files,
  onDelete,
}: FileListProps) => {
  function handleDelete(name: string): void {
    onDelete(files.filter(file => file.name !== name));
  }

  return (
    <Container>
      {files.map(uploadedFile => (
        <li key={uploadedFile.name}>
          <FileInfo>
            <div>
              <strong>{uploadedFile.name}</strong>
              <span>{uploadedFile.readableSize}</span>
            </div>
            <button
              type="button"
              onClick={() => handleDelete(uploadedFile.name)}
            >
              <FiTrash2 size={24} />
            </button>
          </FileInfo>
        </li>
      ))}
    </Container>
  );
};

export default FileList;
