import { useParams, useLocation } from '@umijs/max';
import { PageContainer } from '@ant-design/pro-layout';
import CrudTable from '@/components/CrudTable';

const Table: React.FC = () => {
  const routeParams: any = useParams();
  const routeLocation: any = useLocation();

  return (
    <PageContainer>
      <CrudTable table={routeParams.table} query={routeLocation.query} />
    </PageContainer>
  );
};

export default Table;
