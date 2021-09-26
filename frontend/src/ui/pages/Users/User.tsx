import React, { FormEvent, useCallback } from 'react'
import { Button, Form, Icon, Section } from 'react-bulma-components'
import { Save, Trash2, User as _User } from 'react-feather'
import { useSession } from '../../../contexts/SessionContext'
import { useText } from '../../../hooks/useFields'
import { useForm } from '../../../hooks/useForm'
import { useIdParams } from '../../../hooks/useIdParams'
import { deleteUser, getUser, saveUser } from '../../../services/users'
import { LoadContainer } from '../../components/Loader/Loader'

export function User(): JSX.Element {
  const id = useIdParams()
  const fetch = useCallback(() => getUser(id), [id])
  const { onSave, onDelete, loading, data: user, error } = useForm(fetch, saveUser, deleteUser)
  const session = useSession()

  const [username, setUsername] = useText(user?.username)

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      onSave({ ...user, username })
    },
    [onSave, user, username]
  )

  if (error) {
    return <Section>Error 404</Section>
  }

  return (
    <Section>
      <LoadContainer loading={loading}>
        <form onSubmit={onSubmit}>
          <Form.Field>
            <Form.Label>Username</Form.Label>
            <Form.Control>
              <Form.Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              <Icon align="left" size="small">
                <_User />
              </Icon>
            </Form.Control>
          </Form.Field>

          <Form.Field kind="group">
            <Form.Control>
              <Button type="submit" color="primary">
                <Icon align="left" size="small">
                  <Save />
                </Icon>
                <span>Save</span>
              </Button>
            </Form.Control>

            {user && (
              <Form.Control>
                <Button
                  type="button"
                  color="primary"
                  outlined
                  onClick={() => onDelete(user)}
                  disabled={user.id === session.id}
                >
                  <Icon align="left" size="small">
                    <Trash2 />
                  </Icon>
                  <span>Delete</span>
                </Button>
              </Form.Control>
            )}
          </Form.Field>
        </form>
      </LoadContainer>
    </Section>
  )
}