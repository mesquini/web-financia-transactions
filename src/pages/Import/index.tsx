import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize';

import { toast } from 'react-toastify';
import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    if (!uploadedFiles.length) {
      toast.warn('Insira pelo menos um arquivo!');
      return;
    }

    uploadedFiles.forEach(async file => {
      try {
        const data = new FormData();

        data.append('file', file.file, file.name);
        await api.post('/transactions/import', data);
        return;
      } catch (err) {
        toast.error(err.response.data.message);
        setUploadedFiles(
          uploadedFiles.filter(fileU => file.file.name !== fileU.file.name),
        );
      }
    });

    setTimeout(() => {
      toast.success('Arquivo importado com sucesso!');
      history.push('/');
    }, 1500);
  }

  function submitFile(files: File[]): void {
    const objFiles = files.map(file => ({
      file,
      name: file.name,
      readableSize: filesize(file.size),
    }));

    setUploadedFiles(objFiles);
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && (
            <FileList files={uploadedFiles} onDelete={setUploadedFiles} />
          )}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
