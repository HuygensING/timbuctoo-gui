import React, { DragEvent, SFC } from 'react';
import styled, { withProps, withProps as withStyledProps } from '../styled-components';
import Dropzone, { DropFilesEventHandler, ImageFile } from 'react-dropzone';
import Cloud from './icons/Cloud';
import { compose, withHandlers, withState } from 'recompose';
import { Title } from './layout/StyledCopy';
import translate from '../services/translate';
import uuid from 'uuid/v4';
import { dataSetUploadUrl } from '../constants/api';
import { Col, Grid } from './layout/Grid';
import { MiniLoader } from './Loading';
import Error from './icons/Error';
import Success from './icons/Success';
import themeVars from '../theme';
import { connect } from 'react-redux';
import { RootState } from '../reducers/rootReducer';

const mimeTypeMapping: { [key: string]: string } = {
    ttl: 'text/turtle',
    trig: 'application/trig',
    nt: 'application/n-triples',
    nq: 'application/n-quads',
    n3: 'text/n3',
    xml: 'application/rdf+xml'
};

const StyledCol = styled(Col)`
    background: ${props => props.theme.colors.shade.light};
`;

const Zone = withStyledProps<{ 'data-hovering': boolean }>(styled(Dropzone))`
  border-radius: 10px;
  border: 2px dashed ${({ 'data-hovering': isHovering, theme }) =>
      !isHovering ? theme.colors.black : theme.colors.shade.dark};
  color: ${props => props.theme.colors.black}; 
  padding: 1rem;
  display: flex;
  cursor: pointer;
  background: ${props => props.theme.colors.white};
`;

const State = styled.div`
    margin-right: 1rem;
    width: 1rem;
`;

const Bar = styled.div`
    padding: 1rem;
    border: 1px solid ${props => props.theme.colors.shade.light};
    border-radius: 5px;
    margin-bottom: 1rem;
    display: flex;
`;

const BarText = withProps<{ important?: boolean }>(styled.div)`
  flex: 2;
  color: ${props => (props.important ? themeVars.colors.black : props.theme.colors.shade.dark)};
`;

interface FileInfo {
    id: string;
    file: File;
    state: 'loading' | 'completed' | 'rejected' | 'error';
    errorMessage?: string; // TODO better error handling (parse body, etc)
}

interface OwnProps {
    dataSetName: string;
    ownerId: string;
    onCompletion?: () => void;
}

interface StateProps {
    setHovering: (hovering: boolean) => void;
    setFiles: (files: FileInfo[] | ((files: FileInfo[]) => FileInfo[])) => void;
    hovering: boolean;
    files: FileInfo[];
}

interface ConnectedStateProps {
    hsid: string;
}

interface HandlerProps {
    enter: () => void;
    leave: () => void;
    drop: () => DropFilesEventHandler;
}

type FullProps = StateProps & OwnProps & HandlerProps & ConnectedStateProps;

const StyledTitle = Title.extend`
    margin-top: 0;
    margin-bottom: 0.5rem;
`;

const Upload: SFC<FullProps> = (props: FullProps) => (
    <Grid sm={48}>
        <StyledCol sm={48} smPadding={2}>
            <section>
                <Zone
                    data-hovering={props.hovering}
                    onDragEnter={props.enter}
                    onDragLeave={props.leave}
                    onDrop={props.drop}
                >
                    <Cloud width={'4rem'} height={'4rem'} style={{ marginRight: '1rem' }} />
                    <div>
                        <StyledTitle>{translate('upload.heading')}</StyledTitle>
                        <p>
                            {translate('upload.body')} {Object.keys(mimeTypeMapping).join(', ')}
                        </p>
                    </div>
                </Zone>
            </section>
        </StyledCol>
        {!!props.files.length && (
            <Col sm={48} smPadding={2}>
                <section>
                    <div>
                        <Title>Uploaded files</Title>
                        {props.files.map(fileInfo => (
                            <Bar>
                                <State>
                                    {fileInfo.state === 'loading' && <MiniLoader />}
                                    {(fileInfo.state === 'error' || fileInfo.state === 'rejected') && (
                                        <Error width="1rem" height="1rem" color={themeVars.colors.error} />
                                    )}
                                    {fileInfo.state === 'completed' && (
                                        <Success width="1rem" height="1rem" color={themeVars.colors.primary.light} />
                                    )}
                                </State>
                                <BarText important={true}>{fileInfo.file.name}</BarText>
                                <BarText>
                                    {fileInfo.state === 'rejected' && translate('upload.rejected')}
                                    {fileInfo.state === 'error' && fileInfo.errorMessage}
                                </BarText>
                            </Bar>
                        ))}
                    </div>
                </section>
            </Col>
        )}
    </Grid>
);

export default compose<FullProps, OwnProps>(
    connect(({ user: { hsid } }: RootState) => ({ hsid })),
    withState('hovering', 'setHovering', false),
    withState('files', 'setFiles', []),
    withHandlers<FullProps, HandlerProps>({
        enter: ({ setHovering }) => () => setHovering(true),
        leave: ({ setHovering }) => () => setHovering(false),
        drop: ({ setFiles, ownerId, dataSetName, onCompletion, hsid }) => () => async (
            accepted: ImageFile[],
            rejected: ImageFile[],
            event: DragEvent<HTMLDivElement>
        ) => {
            const rejectedFiles = rejected.map((file: File): FileInfo => ({
                file,
                id: uuid(),
                state: 'rejected'
            }));
            const acceptedFiles = accepted.map((file: File): FileInfo => ({
                file,
                id: uuid(),
                state: 'loading'
            }));

            setFiles(oldFiles => [...oldFiles, ...rejectedFiles, ...acceptedFiles]);

            const promises = acceptedFiles.map(async acceptedFile => {
                const data = new FormData();
                data.append('file', acceptedFile.file);
                const extension = acceptedFile.file.name.split('.').slice(-1)[0];
                const mimetype = mimeTypeMapping[extension] || 'text/turtle';
                data.append('fileMimeTypeOverride', mimetype);
                data.append('encoding', 'UTF-8');

                const response = await fetch(dataSetUploadUrl(ownerId, dataSetName), {
                    method: 'POST',
                    body: data,
                    headers: {
                        authorization: hsid
                    }
                });

                let newFile: FileInfo;
                if (response.ok) {
                    newFile = {
                        ...acceptedFile,
                        state: 'completed'
                    };
                } else {
                    newFile = {
                        ...acceptedFile,
                        state: 'error',
                        errorMessage: `${response.status} ${response.statusText}`
                    };
                }
                setFiles(files => {
                    const outFiles = [...files];
                    const idx = outFiles.findIndex(sFile => acceptedFile.id === sFile.id);
                    outFiles[idx] = newFile;
                    return outFiles;
                });
            });

            await Promise.all(promises);
            if (promises.length && onCompletion) {
                onCompletion();
            }
        }
    })
)(Upload);
