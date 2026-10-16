import { Component, type ReactNode } from 'react'
import { Button, Result, Space } from 'antd'

export class ReadingBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(error: Error) {
    console.error(error)
  }

  render() {
    if (!this.state.failed) return this.props.children
    return <Result
      status="warning"
      title="这一页暂时没有打开"
      subTitle="已保存的学习记录仍保留在当前浏览器。可以重试，或返回学习路线。"
      extra={<Space>
        <Button type="primary" onClick={() => this.setState({ failed: false })}>再试一次</Button>
        <Button href="#/paths">返回学习路线</Button>
      </Space>}
    />
  }
}
