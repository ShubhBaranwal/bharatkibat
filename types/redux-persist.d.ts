declare module 'redux-persist/integration/react' {
    import { ReactNode, PureComponent } from 'react';
    import { Persistor } from 'redux-persist';

    export interface PersistGateProps {
        children?: ReactNode;
        loading?: ReactNode;
        persistor: Persistor;
        onBeforeLift?: () => void | Promise<void>;
    }

    export class PersistGate extends PureComponent<PersistGateProps> { }
}
