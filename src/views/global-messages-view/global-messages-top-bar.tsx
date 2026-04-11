'use client';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components';
import { TRANSLATIONS } from '@/locales';
import {
  ActionContainer,
  ActionContainerHeader,
  ProjectAddButton,
  ProjectsCount,
} from '@/views/projects-view/projects-view.styled';

const selectHoverTextSx = {
  '&:hover .MuiSelect-select': {
    color: 'primary.main',
  },
} as const;

const formControlHoverLabelSx = {
  '&:hover .MuiInputLabel-root': {
    color: 'primary.main',
  },
} as const;

export type TGlobalMessagesTopBarProps = {
  visibleCount: number;
  totalCount: number;
  filterProjectId: string | null;
  onFilterProjectId: (projectId: string | null) => void;
  composeProjectId: string;
  onComposeProjectId: (projectId: string) => void;
  projectOptions: { id: string; project_name: string }[];
  onNewMessage: () => void;
};

export function GlobalMessagesTopBar({
  visibleCount,
  totalCount,
  filterProjectId,
  onFilterProjectId,
  composeProjectId,
  onComposeProjectId,
  projectOptions,
  onNewMessage,
}: TGlobalMessagesTopBarProps) {
  const { t } = useTranslation();

  return (
    <ActionContainer sx={{ flexWrap: 'wrap', rowGap: 2, columnGap: 2 }}>
      <ActionContainerHeader>
        <PageHeader title={TRANSLATIONS.WIADOMOSCI} />
        <ProjectsCount>
          {visibleCount}/{totalCount}
        </ProjectsCount>
      </ActionContainerHeader>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 1.5,
          flex: 1,
          minWidth: 0,
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          useFlexGap
          sx={{ flex: 1, minWidth: 0, justifyContent: 'flex-end' }}
        >
          <FormControl
            size="small"
            sx={{
              minWidth: { xs: '100%', sm: 200 },
              ...formControlHoverLabelSx,
            }}
          >
            <InputLabel id="global-messages-filter-label">
              {t(TRANSLATIONS.MESSAGES_FILTER_LABEL)}
            </InputLabel>
            <Select
              labelId="global-messages-filter-label"
              label={t(TRANSLATIONS.MESSAGES_FILTER_LABEL)}
              value={filterProjectId ?? 'all'}
              sx={selectHoverTextSx}
              onChange={(e) => {
                const v = e.target.value as string;
                onFilterProjectId(v === 'all' ? null : v);
              }}
            >
              <MenuItem value="all">
                {t(TRANSLATIONS.MESSAGES_ALL_PROJECTS)}
              </MenuItem>
              {projectOptions.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.project_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            size="small"
            sx={{
              minWidth: { xs: '100%', sm: 220 },
              ...formControlHoverLabelSx,
            }}
          >
            <InputLabel id="global-messages-compose-label" shrink>
              {t(TRANSLATIONS.MESSAGES_COMPOSE_PROJECT_LABEL)}
            </InputLabel>
            <Select
              labelId="global-messages-compose-label"
              label={t(TRANSLATIONS.MESSAGES_COMPOSE_PROJECT_LABEL)}
              displayEmpty
              value={composeProjectId}
              sx={selectHoverTextSx}
              onChange={(e) => onComposeProjectId(e.target.value as string)}
            >
              <MenuItem value="">
                <em>{t(TRANSLATIONS.MESSAGES_COMPOSE_PROJECT_PLACEHOLDER)}</em>
              </MenuItem>
              {projectOptions.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.project_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <ProjectAddButton type="button" onClick={onNewMessage}>
          <AddCircleOutlineOutlinedIcon />
        </ProjectAddButton>
      </Box>
    </ActionContainer>
  );
}
